const path = require('path')

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenamesnp
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}