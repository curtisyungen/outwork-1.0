module.exports = function(sequelize, DataTypes) {
    let Bikes = sequelize.define("Bikes", {
        // UserID of user who submitted bike
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
        // Date bike was completed
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total distance of bike in miles
        distance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total duration of bike in minutes
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // General location where bike took place
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Primary surface for bike (street, bike path, grass, trail, etc.)
        surface: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Primary weather condition for bike (sunny, rainy, cloudy, windy, etc.)
        weather: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Elevation gain over entire bike in feet (optional)
        climb: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Average positive grade over entire bike (percentage) (optional)
        grade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Bike that was ridden (optional)
        bike: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // User-entered comments about bike (optional)
        notes: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        // Link to map of bike (optional)
        map: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    
    return Bikes;
}