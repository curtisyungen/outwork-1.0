module.exports = function(sequelize, DataTypes) {
    let Hof = sequelize.define("Hof", {
        // Name of award
        award: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // First name of user who won award
        userName: {
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