module.exports = function(sequelize, DataTypes) {
    let Workouts = sequelize.define("Workouts", {
        // Type of workout
        workoutType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // UserID of user who submitted workout
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // First name of user who input run
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Last name of user who input run
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Date run was completed
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Time of Day workout was completed
        time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // General location where run took place
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        distance: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total duration of run in minutes
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total time converted into minutes
        ttlMins: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Average mile pace for run
        milePace: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Special type of run: repeats, hill repeats, race (optional)
        runType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Number of laps swam
        laps: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Summary of repeats completed (distance, time, rest between) (optional)
        repeats: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // Name of race (optional)
        race: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Primary surface/water type (street, bike path, trail; pool, lake, ocean, etc.)
        surface: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Primary weather condition for run (sunny, rainy, cloudy, windy, etc.)
        weather: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Elevation gain over entire run in feet (optional)
        climb: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Average positive grade over entire run (percentage) (optional)
        grade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Shoe worn for run (optional)
        shoe: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Bike that was ridden (optional)
        bike: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Level of difficulty ONLY IF generator workout
        generator: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total number of push-ups in workout, all variations
        pushups: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // Total number of pull-up/chin-ups in workout, all variations
        pullups: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // Entire workout saved as string
        workout: {
            type: DataTypes.TEXT,
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
        },
        // Link to map of bike (optional)
        map: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    
    return Workouts;
}