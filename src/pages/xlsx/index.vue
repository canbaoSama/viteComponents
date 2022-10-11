<template>
    <div class="flex items-center h-32">
        <a-upload
            :show-upload-list="false"
            accept=".xlsx, .xls"
            :multiline="false"
            list-type="picture-card"
            class="flex items-center flex-wrap justify-center"
            :beforeUpload="beforeUpload"
        >
            <div class="upload-content">
                <LoadingOutlined v-if="isUploding" style="font-size: 40px; color: #1890ff" />
                <CloudUploadOutlined v-else style="font-size: 40px; color: #1890ff" />
                <div class="mt-1">导入文件</div>
            </div>
        </a-upload>
        <a-button class="mt-5" type="primary" @click="createBook">生成EXCEL</a-button>
    </div>
    <div class="overflow-auto w-full h-[calc(100%-8rem)] pr-4 pb-4">
        <CommonTable :dataSource="dataSource" class="min-w-300" />
    </div>
</template>
<script setup>
import * as XLSX from 'xlsx/xlsx.js';
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons-vue';

import CommonTable from './components/CommonTable.vue';

defineRouteMeta({
    name: 'xlsx',
    title: 'xlsx 功能',
});

const isUploding = ref(false);

const excelJsonData = ref([]);
const dataSource = ref([]);
//对数据进行处理，实现表格合并展示的功能
const parsingTable = (table) => {
    let header = []; //表格列
    const keys = Object.keys(table);
    let maxRowIndex = 0; //最大行数
    //!ref工作表范围
    if (table['!ref'] && table['!ref'].includes(':')) {
        const refs = table['!ref'].split(':');
        maxRowIndex = refs[1].replace(/[A-Z]/g, '');
    }
    for (const [i, h] of keys.entries()) {
        //提取key中的英文字母
        const col = h.replace(/[^A-Z]/g, '');
        //单元格是以A-1的形式展示的，所以排除包含!的key
        h.indexOf('!') === -1 && header.indexOf(col) === -1 && header.push(col);
        //如果!ref不存在时，  设置某一列最后一个单元格的索引为最大行数
        if ((!table['!ref'] || !table['!ref'].includes(':')) && header.some((c) => table[`${c}${i}`])) {
            maxRowIndex = i > maxRowIndex ? i : maxRowIndex;
        }
    }
    header = header.sort((a, b) => a.localeCompare(b)); //按字母顺序排序 [A, B, ..., E, F]
    // console.log(header)
    // console.log(maxRowIndex)

    //excel的行表示为 1, 2, 3, ......, 所以index起始为1
    for (let index = 1; index <= maxRowIndex; index++) {
        let row = []; //行
        //每行的单元格集合, 例: [A1, ..., F1]
        row = header.map((item) => {
            const key = `${item}${index}`;
            const cell = table[key];
            return {
                key,
                name: cell ? cell.v : '',
                // style: cell ? cell.s : '',   //单元格的样式/主题, 有些不适用
            };
        });
        dataSource.value.push(row);
    }

    //合并单元格
    if (table['!merges']) {
        for (const item of table['!merges']) {
            //s开始  e结束  c列  r行  (行、列的索引都是从0开始的)
            for (let r = item.s.r; r <= item.e.r; r++) {
                for (let c = item.s.c; c <= item.e.c; c++) {
                    // console.log('=======', r, c)
                    //查找单元格时需要r+1
                    //例：单元格A1的位置是{c: 0, r:0}
                    const rowIndex = r + 1;
                    if (!dataSource.value[r]) {
                        dataSource.value.splice(
                            r,
                            0,
                            header.map((col) => ({ key: `${col}${rowIndex}` })),
                        );
                    }
                    const cell = dataSource.value[r].find((a) => a.key === `${header[c]}${rowIndex}`);
                    cell.rowspan = 0;
                    cell.colspan = 0;
                }
            }

            //合并时保留范围内左上角的单元格
            const start = `${header[item.s.c]}${item.s.r + 1}`;
            // let end = `${header[item.e.c]}${item.e.r + 1}`
            // console.log(start)
            const cell = dataSource.value[item.s.r].find((a) => a.key === start);
            cell.rowspan = item.s.r !== item.e.r ? item.e.r - item.s.r + 1 : 1; //纵向合并
            cell.colspan = item.s.c !== item.e.c ? item.e.c - item.s.c + 1 : 1; //横向合并
        }
    }
    console.log(dataSource.value);
};

const downFile = (blobData) => {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(new Blob([blobData]), `${new Date().getTime()}.xlsx`);
    } else {
        const url = window.URL.createObjectURL(new Blob([blobData]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', `${new Date().getTime()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};
const createBook = () => {
    //使用table_to_sheet或table_to_book其中一种方法

    //table_to_sheet的用法
    const worksheet = XLSX.utils.table_to_sheet(document.getElementById('tableView'));
    const workbook = {
        SheetNames: [],
        Sheets: {},
    };
    workbook.SheetNames.push('sheet1');
    worksheet['!cols'] = [{ wch: 20 }]; //设置第一列的列宽
    workbook.Sheets.sheet1 = worksheet;

    //table_to_book的用法
    // let workbook = XLSX.utils.table_to_book(document.getElementById('tableView'));

    const data = XLSX.write(workbook, {
        bookType: 'xlsx', // 要生成的文件类型
        type: 'array',
    });
    const blobData = new Blob([data], { type: 'application/octet-stream' });
    downFile(blobData);
};

const readFile = async (file) =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            resolve(ev.target.result);
        };
        reader.readAsBinaryString(file); //以二进制的方式读取
    });
const beforeUpload = async (file) => {
    const data = await readFile(file);
    const workbook = XLSX.read(data, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]; //获取第一个Sheet
    excelJsonData.value = XLSX.utils.sheet_to_json(worksheet); //json数据格式
    parsingTable(worksheet);
};
</script>
