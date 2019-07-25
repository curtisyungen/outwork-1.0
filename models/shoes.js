module.exports = function(sequelize, DataTypes) {
    let Shoes = sequelize.define("Shoes", {
        // UserID of shoe owner
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Name of shoe
        shoe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Date shoes were purchased
        buyDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Total number of miles on shoe
        miles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Total number of times shoe was worn on workout
        wears: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    return Shoes;
}