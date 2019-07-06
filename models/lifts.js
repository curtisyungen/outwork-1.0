module.exports = function(sequelize, DataTypes) {
    let Lifts = sequelize.define("Lifts", {
        // UserID of user who submitted workout
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Date run was completed
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // General location where run took place
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total duration of run in minutes
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total number of push-ups in workout, all variations
        pushups: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total number of pull-up/chin-ups in workout, all variations
        pullups: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Entire workout saved as string
        workout: {
            type: DataTypes.STRING(5000),
            allowNull: true,
        },
        // Main muscle groups targeted in workout
        muscleGroups: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        // User-entered notes on workout
        notes: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        }
    });
    
    return Lifts;
}