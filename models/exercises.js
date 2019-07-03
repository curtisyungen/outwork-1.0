module.exports = function(sequelize, DataTypes) {
    let Exercises = sequelize.define("Exercises", {
        // Name of exercise
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Equipment needed for exercise (optional)
        equipment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Main muscle group targeted
        primaryMG: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Secondary muscle group targeted
        secondaryMG: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    
    return Exercises;
}