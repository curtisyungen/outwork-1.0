module.exports = function(sequelize, DataTypes) {
    let Runs = sequelize.define("Runs", {
        // UserID of user who submitted run
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Date run was completed
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total distance of run in miles
        distance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total duration of run in minutes
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Special type of run: repeats, hill repeats, race (optional)
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Summary of repeats completed (distance, time, rest between) (optional)
        repeats: {
            type: DataTypes.STRING(2500),
            allowNull: true,
        },
        // Name of race (optional)
        race: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // General location where run took place
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Primary surface for run (street, bike path, grass, trail, etc.)
        surface: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Primary weather condition for run (sunny, rainy, cloudy, windy, etc.)
        weather: {
            type: DataTypes.STRING,
            allowNull: false,
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
        // User-entered comments about run (optional)
        notes: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        // Link to map of run (optional)
        map: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    
    return Runs;
}