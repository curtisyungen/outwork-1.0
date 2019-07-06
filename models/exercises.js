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
            allowNull: true,
        },
        // Secondary muscle group targeted
        secondaryMG: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Low number of reps/duration
        low: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Medium number of reps/duration
        med: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // High number of reps/duration
        high: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Extreme number of reps/duration
        extreme: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    
    return Exercises;
}