## (coral) 提效平台、信息快速共享平台

### 接入加密

1.  申请 appId 和 appKey；
2.  生成一个随机的 32 位数的字符串；
3.  加密参数按照 key=value 的格式，并按照 ASCII 字典序排序，按照规则拼接得到字符串 stringSignTemp，并对该字符串通过 cryptoJs.HmacSHA256 加密并大写生成 token;
4.  写一个公共方法，发送请求时将参与加密的参数和 token 参数带上，等待对方验证并返回数据。

### mongodb 管道聚合

1. 封装设计通用的数据库通讯方法，解决入手难，重复写代码的问题；
2. 封装管道聚合方法，模糊请求、多表联动等；
3. 设计数据库表，采用父集储存子集还是子集储存父集(自己选用的)

### 读取不同类型文件解析

-   json 文件：

```js
const file = await this.getFileData({ ...params, fileName: 'package.json' });
const content = JSON.parse(new Buffer(file.data.content, 'base64').toString());
```

-   ci 文件：

```js
const YAML = require('yaml');
const file = await this.getFileData({ id: params.gitRespositoryId, branch: 'master', fileName: '.gitlab-ci.yml' });
const content = YAML.parse(new Buffer(file.data.content, 'base64').toString());
```

-   前端 xlsx、xls 文件读取：

```js
import * as XLSX from 'xlsx/xlsx.js';

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
```

### 自己封装得文件创建和文件储存

有默认得文件路径，但是要是传递了不同的路径前缀，就会利用去判断是否有文件夹，然后再去创建文件夹和文件；

### 上传文件的压缩

1. 上传图片等文件的时候需要利用 canvas 进行压缩；

```js
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// 不要用png格式，png格式图片太大了；质量可以调整为更小，看实际情况
// 直接形成图片，贴到img标签
// toDataURL()方法会返回一个包含图片展示的data URL，是一个UTF-16字符串
const imageUrl = canvas.toDataURL('image/jpeg', 0.5);

// 上传图片，根据返回值获取图片url贴到img标签
// toBlob()方法创建Blob对象，在Web中，Blob类型的对象表示不可变的类似文件对象的原始数据
// 通俗点说，就是Blob对象是二进制数据，但它是类似文件对象的二进制数据
// 因此可以像操作File对象一样操作Blob对象，实际上，File继承自Blob
// File对象是特殊类型的Blob,所以也继承了Blob特有的方法和属性,同时又有自己独特的属性和方法
canvas.toBlob(
    (blob) => {
        const fd = new FormData();
        fd.append('file', blob, `xxx.jpeg`);
        // 形成的封面图上传，获取图片url展示
    },
    'image/jpeg',
    0.5,
);
```

2. Potrace 把图片转为 svg 图片，并且添加主色调配置

```js
import Potrace from 'potrace';
Potrace.trace(src.value, form.value, (err, svg) => {
    const parser = new DOMParser();
    svgHref.value = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    imgRef.value.innerHTML = '';
    imgRef.value.append(doc.getElementsByTagName('svg')[0]);
});
```

3. 基于 vue2 写的放大查看富文本图片组件
    - 设计最大放大区域，高或者宽只要抵达到最大值就不能再放大；
    - 图集列表，切换时要保持原有放大属性，信息都要暂存

### 不同系统之前的异步和同步任务执行，以及任务返回，终止，继续执行的设计

### UI 库组件功能补全

1. 表格需要滚动，需要固定高度，需要在页面窗口变化时实时更新
2. 下拉多选树的层级区分自己封装

### windicss 的配置

1. 基础配置
2. 不生效的 class,需要添加白名单

### xlsx 包读取文件

读取到的 json 文件转为表格数据、并且展示为基础表格

### webgl 展示和操作

1. 自创建的地板等作为背景，展示自己的系统流程
2. 导入 3D 模型，开启的 live server 代理文件地址
3. 引入的 GUI 进行 webgl 的操作
