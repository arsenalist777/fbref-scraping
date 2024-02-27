const Loader = require('./loader.js');
const util = require('util');
const cheerio = require('cheerio');
const Common = require('../common/common.js');
const Const = require('../common/const.js');

/**
 * @class PlStatisticsLoader
 */
module.exports = class PlStatisticsLoader extends Loader {

    /**
     * fbref url for premier league stats
     */
    static FBREF_URL = 'https://fbref.com/en/comps/9/%s/%s-Premier-League-Stats';

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
        super.downloadUrl = util.format(PlStatisticsLoader.FBREF_URL, this.season, this.season);
    };

    /**
     * @method download 
     * @description download html and parse
     * @override
     */
    async download() {
        const html = await super.getPageHTML();
        this.$ = cheerio.load(html);
    };

    /**
     * @method process
     * @description process scraping data
     * @override
     */
    process() {
        const $ = this.$;

        // create table data set from fbref html
        Object.keys(Const.CONST.PL_STATISTICS).forEach(key => {
            let tableId = Const.CONST.PL_STATISTICS[key].TABLE_ID;
            let $table = $(`#${tableId}`);
            this.tableDataSet[key] = [];
            Common.scrapeDataFromTable($, $table, this.tableDataSet[key]);
        });
    };

    /**
     * @method upload
     * @description upload scraping data to google spread sheet
     * @override
     */
    async upload() {

        // upload table data to google spread sheet
        const response = await Promise.all(Object.keys(this.tableDataSet).map(async (key) => {

            // calculate spreadsheet range
            const range = Common.createRange(this.tableDataSet[key].length, this.tableDataSet[key][0].length);

            // update sheet
            await Loader.updateSheet(PlStatisticsLoader.SPREAD_SHEET_ID, this.sheetSeason, Const.CONST.PL_STATISTICS[key].SHEET_NAME, range, this.tableDataSet[key], (response) => {
                console.log(response);
            });
        }));
    };





}