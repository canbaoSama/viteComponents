const { extname, basename } = require('path');
const { statSync, readFileSync, writeFileSync, readdirSync } = require('fs');
const { optimize } = require('svgo');

const presetDefault = [
    {
        name: 'preset-default',
    },
    'cleanupListOfValues',
    {
        name: 'removeAttrs',
        params: {
            attrs: '(class)',
        },
    },
];

const dirPath = '../src/images/svg';

function optimizeSvg(files) {
    const optimizedSvgData = [];
    for (const filePath of files) {
        if (statSync(filePath).isFile() && extname(filePath) === '.svg') {
            const data = readFileSync(filePath, 'utf-8');
            const svgData = optimize(data, {
                path: filePath,
                plugins: presetDefault,
            });
            optimizedSvgData.push({
                fileName: basename(filePath),
                ...svgData,
            });
            writeFileSync(filePath, svgData.data);
        }
    }
    return Promise.all(optimizedSvgData);
}

console.log(readdirSync(dirPath).map((item) => `${dirPath}/${item}`));
optimizeSvg(readdirSync(dirPath).map((item) => `${dirPath}/${item}`));
