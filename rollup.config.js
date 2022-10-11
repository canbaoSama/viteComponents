export default {
    input: 'src/utils/index.js',
    output: {
        file: './rollup/utils.js',
        format: 'umd',
        name: 'WU',
        exports: 'named',
    },
};
