
const axios = require('axios');
const PlStatisticsLoader = require('./loader/pl-statistics-loader.js');
const ArsenalGoalLogLoader = require('./loader/arsenal-goal-log-loader.js');
/**
 * main function
 */
async function main() {
    let plStatisticsLoader = new PlStatisticsLoader(process.argv[2]);
    plStatisticsLoader.execute();

    let arsenalGoalLogLoader = new ArsenalGoalLogLoader(process.argv[2]);
    arsenalGoalLogLoader.execute();
}

// execute main function
main();
