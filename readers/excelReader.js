import Excel from 'exceljs';

function getRGBFromARGB(src) {
    return src.slice(2);
}

export class ExcelReader {
    async readFromFile(filename) {
        const workbook = new Excel.Workbook();
        const worksheet = (await workbook.xlsx.readFile(filename)).getWorksheet(
            1
        );

        const data = [];
        worksheet.columns.forEach((column, columnNumber) => {
            column.eachCell(function (cell, rowNumber) {
                const color =
                    cell.style.fill?.bgColor || cell.style.fill?.fgColor;
                const x = rowNumber - 1;
                const y = columnNumber;
                const text =
                    typeof cell.value === 'number'
                        ? cell.value
                        : cell.value?.richText?.[0]?.text;
                if (!data[x]) data[x] = [];
                data[x][y] = {
                    x,
                    y,
                    text: text?.toString(),
                    color: color ? `#${getRGBFromARGB(color.argb)}` : '#FFFFFF',
                };
            });
        });

        return data;
    }
}
