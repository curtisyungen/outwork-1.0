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
        // Total duration of run in minutes
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // General location where run took place
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Generator workout or not - true or false
        generator: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total number of sets in workout
        sets: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total number of push-ups in workout, all variations
        pushups: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total number of pull-up/chin-ups in workout, all variations
        pullups: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Entire workout saved as string
        workout: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        // Main muscle groups targeted in workout
        muscleGroups: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        }
    });
    
    return Lifts;
}