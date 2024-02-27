module.exports = class Const {

    static CONST = {

        // PL_STATISTICS_LOADER
        PL_STATISTICS: {
            SQUAD_PASSING: {
                SHEET_NAME: 'Squad Passing',
                TABLE_ID: 'stats_squads_passing_for'
            },
            SQUAD_SHOOTING: {
                SHEET_NAME: 'Squad Shooting',
                TABLE_ID: 'stats_squads_shooting_for'
            },
            SQUAD_GOAL_AND_SHOT_CREATION: {
                SHEET_NAME: 'Squad Goal and Shot Creation',
                TABLE_ID: 'stats_squads_gca_for'
            },
            SQUAD_POSSESSION: {
                SHEET_NAME: 'Squad Possession',
                TABLE_ID: 'stats_squads_possession_for'
            },
        },

        // ARSENAL_GOAL_LOG_LOADER
        ARSENAL_GOAL_LOGS: {
            SHEET_NAME: 'Goal Logs',
            TABLE_ID: 'goallogs_for'
        }

    };
}