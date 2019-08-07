module.exports = function(sequelize, DataTypes) {
    let Hof = sequelize.define("Hof", {
        // Name reference to award (mostWorkouts, mostRestDays, etc.)
        award: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Title of Award (Hardest Worker, Snoozer, etc.)
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Description of award
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Font Awesome icon reference
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Units for measuring award value (workouts, days, feet, etc.)
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // First name of user who won award
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Quantity that earned award, i.e. number of workouts, rest days, etc.
        value: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    
    return Hof;
}