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
        },

        // OPTA_STATISTICS_LOADER
        OPTA_STATISTICS: {
            EXPECTED_GOALS_FOR: {
                SHEET_NAME: 'Expected Goals For',
                TABLE_ID: '',
                TABLE_CLASS: 'data-table',
                TABLE_WRAPPER_CLASS: 'table-wrapper'
            },
            EXPECTED_GOALS_AGAINST: {
                SHEET_NAME: 'Expected Goals Against',
                TABLE_ID: '',
                TABLE_CLASS: 'data-table',
                TABLE_WRAPPER_CLASS: 'table-wrapper'
            },
            TEAM_SEQUENCE_STYLES: {
                SHEET_NAME: 'Team Sequence Styles',
                TABLE_ID: '',
                TABLE_CLASS: 'data-table',
                TABLE_WRAPPER_CLASS: 'table-wrapper'
            },
            TEAM_SEQUENCE_PRESSURES: {
                SHEET_NAME: 'Team Sequence Pressures',
                TABLE_ID: '',
                TABLE_CLASS: 'data-table',
                TABLE_WRAPPER_CLASS: 'table-wrapper'
            },
        }
    };
}