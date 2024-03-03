const Loader = require('./loader.js');
const util = require('util');
const cheerio = require('cheerio');
const Common = require('../common/common.js');
const Const = require('../common/const.js');

/**
 * @class OptStatisticsLoader
 */
module.exports = class OptStatisticsLoader extends Loader {

    /**
     * opta url for premier league stats
     */
    static OPTA_URL = 'https://theanalyst.com/eu/2023/08/premier-league-stats-%s/';

    /**
     * spread sheet id
     */
    static SPREAD_SHEET_ID = '1FO5NjJF0LnJo2d2VsCuKYRghD4QWvCOg2a0Yrya0JAo';

    /**
     * @constructor　constructor
     * @param {String} season 20XX-20XX
     */
    constructor(season) {
        super();
        this.season = season;
        this.sheetSeason = season.substring(0, 5) + season.substring(7);

        // cheerio object
        this.$ = null;
        this.tableDataSet = {};
    };

    /**
     * @method init
     * @description init
     * @override
     */
    init() {
        super.downloadUrl = util.format(OptStatisticsLoader.OPTA_URL, this.sheetSeason);
    };

    /**
     * @method download 
     * @description download html and parse
     * @override
     */
    async download() {
        const html = await super.getAsyncLoadedPageAndIframeHTML('networkidle0', '#iFrameResizer0', 'domcontentloaded', '.stat, .team-sequence-pressure-goal, .ending');
        this.$ = cheerio.load(html);
    }

    /**
     * @method process
     * @description process scraping data
     * @override
     */
    process() {
        const $ = this.$;

        // create table data set from opta html
        Object.keys(Const.CONST.OPTA_STATISTICS).forEach(key => {
            const tableClass = Const.CONST.OPTA_STATISTICS[key].TABLE_CLASS;
            const tableWrapperClass = Const.CONST.OPTA_STATISTICS[key].TABLE_WRAPPER_CLASS;
            const tableTitle = Const.CONST.OPTA_STATISTICS[key].SHEET_NAME;
            this.tableDataSet[key] = [];

            // create table data set
            Common.scrapeDataFromTableByClass($, this.tableDataSet[key], tableClass, tableWrapperClass, tableTitle);
        });
    };

    /**
     * @method upload
     * @description upload scraping data to google spread sheet
     * @override
     */
    async upload() {

        // upload to google spread sheet
        const response = await Promise.all(Object.keys(this.tableDataSet).map(async (key) => {

            // calculate spreadsheet range
            const range = Common.createRange(this.tableDataSet[key].length, this.tableDataSet[key][0].length);

            //update sheet
            await Loader.updateSheet(OptStatisticsLoader.SPREAD_SHEET_ID, this.sheetSeason, Const.CONST.OPTA_STATISTICS[key].SHEET_NAME, range, this.tableDataSet[key], (response) => {
                console.log(response);
            });
        }));
    };
}