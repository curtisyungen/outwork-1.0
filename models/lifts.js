module.exports = function(sequelize, DataTypes) {
    let Lifts = sequelize.define("Lifts", {
        // UserID of user who submitted workout
        userID: {
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
    });
    
    return Lifts;
}