const Loader = require('./loader.js');
const util = require('util');
const cheerio = require('cheerio');
const Common = require('../common/common.js');
const Const = require('../common/const.js');

/**
 * @class ArsenalGoalLogLoader
 */
module.exports = class ArsenalGoalLogLoader extends Loader {

    /**
    * fbref url for premier league stats
    */
    static FBREF_URL = 'https://fbref.com/en/squads/18bb7c10/%s/goallogs/c9/Arsenal-Goal-Logs-Premier-League';

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
        this.dataTable = [];
    };

    /**
     * @method init
     * @description init
     * @override
     */
    init() {
        super.downloadUrl = util.format(ArsenalGoalLogLoader.FBREF_URL, this.season);
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
        const $table = $(`#${Const.CONST.ARSENAL_GOAL_LOGS.TABLE_ID}`);
        Common.scrapeDataFromTable($, $table, this.dataTable);
    };

    /**
     * @method upload
     * @description upload data to spread sheet
     * @override
     */
    async upload() {

        //calculate spreadsheet range
        const range = Common.createRange(this.dataTable.length, this.dataTable[0].length);

        // upload data to spread sheet
        await Loader.updateSheet(ArsenalGoalLogLoader.SPREAD_SHEET_ID, this.sheetSeason, Const.CONST.ARSENAL_GOAL_LOGS.SHEET_NAME, range, this.dataTable, (response) => {
            console.log(response);
        });
    };
}