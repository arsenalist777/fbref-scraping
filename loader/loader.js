const axios = require('axios');
const Common = require('../common/common.js');
const execSync = require('child_process').execSync;

/**
 * @class Loader
 */
module.exports = class Loader {

    /**
     * end point
     */
    static API_ENDPOINT = 'https://sheets.googleapis.com/v4/spreadsheets/';

    /**
     * scope for spread sheet
     */
    static API_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    /**
     * command for getting token
     */
    static TOKEN_COMMAND = 'gcloud auth application-default print-access-token --scopes=';

    /**
     * @constructor　constructor
     */
    constructor() {
        this.downloadUrl = '';
        this.downloadSection = [];
    };

    /**
     * init
     */
    init() {
    };

    /**
     * download data
     * must be override
     */
    async download() {
    };

    /**
     * process data
     * must be override
     */
    process() {
    };

    async upload() {
    };

    /**
     * execute loader
     */
    async execute() {
        this.init();
        await this.download();
        this.process();
        await this.upload();
    };

    /**
     * get page html
     * @returns html
     */
    async getPageHTML() {
        try {
            const response = await axios.get(this.downloadUrl);
            return response.data;
        } catch (error) {
            console.error('Error while fetching page:', error);
            throw error;
        }
    };

    /**
     * create url pathes for spread sheet
     * 
     * @param {String} spreadsheetId spreadsheet id 
     * @param {String} season season
     * @param {String} sheetName sheet name
     * @returns 
     */
    static createUrls(spreadsheetId, season, sheetName) {
        let url = [spreadsheetId, encodeURI(`${season} ${sheetName}`)];
        return url;
    };

    /**
     * create spread sheet api token
     * @returns token
     */
    static createSpreadSheetApiToken() {
        return execSync(this.TOKEN_COMMAND + this.API_SCOPE).toString().replace(/\r\n/g, '');
    }

    /**
     * update spread sheet request
     * @param {String} spreadsheetId spreadsheet id
     * @param {String} season season
     * @param {String} sheetName sheet name
     * @param {String} range range
     * @param {Array} tableData table data
     * @param {Function} callback callback
     */
    static async updateSheet(spreadsheetId, season, sheetName, range, tableData, callback) {

        // create request
        const urlPathes = this.createUrls(spreadsheetId, season, sheetName);
        const url = this.API_ENDPOINT + urlPathes[0] + `/values/'${urlPathes[1]}'${range}` + '?valueInputOption=RAW';
        const token = this.createSpreadSheetApiToken();
        const request = {
            'range': `'${season} ${sheetName}'` + range,
            'majorDimension': 'ROWS',
            'values': tableData
        };

        // send http request
        axios.put(url, JSON.stringify(request), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            callback(response);
        }).catch((error) => {
            console.error('Error while updating sheet: ', error);
            console.error('API message: ', error.response.data.error.message);
            throw error;
        });
    }
}