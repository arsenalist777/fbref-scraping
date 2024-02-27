const cheerio = require('cheerio');
module.exports = class Common {



    /**
     * convert number to alphabet(A~Z, AA~ZZ, ...)
     * @param {*} number 
     * @returns number as alphabet order
     */
    static numberToAlphabet(number) {
        const base = 'A'.charCodeAt(0) - 1;
        let result = '';
        while (number > 0) {
            const remainder = number % 26;
            if (remainder === 0) {
                result = 'Z' + result;
                number = Math.floor(number / 26) - 1;
            } else {
                result = String.fromCharCode(base + remainder) + result;
                number = Math.floor(number / 26);
            }
        }
        return result;
    };

    /**
     * scrape data from table
     * @param {*} $ cheerio object
     * @param {*} $table table from fbref
     * @param {*} dataTable scraped data array
     */
    static scrapeDataFromTable($, $table, dataTable) {
        $table.find('tr').each((i, tr) => {

            // skip thead row
            if ($(tr).attr('class') === 'thead') {
                return;
            }
            let data = [];
            $(tr).find('th, td').each((j, thtd) => {
                if ($(thtd).attr('colspan')) {
                    for (let k = 0; k < $(thtd).attr('colspan'); k++) {
                        data.push($(thtd).text().trim());
                    }
                } else {
                    data.push($(thtd).text().trim());
                }
            });
            dataTable.push(data);
        });
    };

    /**
     * calculate range for spread sheet
     * @param {*} rowNum 
     * @param {*} colNum 
     * @returns 
     */
    static createRange(rowNum, colNum) {
        return '!A1:' + this.numberToAlphabet(colNum) + rowNum;
    }
}