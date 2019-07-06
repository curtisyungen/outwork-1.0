module.exports = function(sequelize, DataTypes) {
    let Equipment = sequelize.define("Equipment", {
        // Name of equipment
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    return Equipment;
}