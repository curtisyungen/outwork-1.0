module.exports = function(sequelize, DataTypes) {
    let Swims = sequelize.define("Swims", {
        // UserID of user who submitted swim
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Date swim was completed
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total distance of swim in miles
        distance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Number of laps swam
        laps: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total duration of swim in minutes
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // General location where swim took place
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Type of water - pool, lake, ocean, river (optional)
        waterType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Entire swim workout saved as string
        swimWorkout: {
            type: DataTypes.STRING(2500),
            allowNull: false,
        },
        // User-entered comments about swim (optional)
        notes: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    });
    
    return Swims;
}