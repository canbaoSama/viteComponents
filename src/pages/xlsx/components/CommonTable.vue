<template>
    <table id="tableView" style="border-collapse: collapse; border: 1px solid">
        <tr v-for="(item, index) in dataSource" :key="index">
            <template v-for="(sub, subIndex) in item" :key="subIndex">
                <td v-if="sub.rowspan !== 0 && sub.colspan !== 0" :rowspan="sub.rowspan || 1" :colspan="sub.colspan || 1" style="width: auto">
                    <pre class="flex items-center m-0">{{ `${sub?.name?.toString().trim()}` }}</pre>
                </td>
            </template>
        </tr>
    </table>
</template>
<script setup>
defineProps({ dataSource: Array });
</script>
<style lang="less" scoped>
tr {
    background: #fff;
    &:first-child {
        word-break: keep-all;
        background-color: #fafafa;
        font-weight: bold;
    }
    td {
        padding: 16px;
        border: 1px solid #f0f0f0;
        word-break: keep-all;
        &:first-child pre {
            justify-content: center;
        }
    }
}
</style>
