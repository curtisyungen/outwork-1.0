module.exports = function(sequelize, DataTypes) {
    let Reset = sequelize.define("Reset", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetCode: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    
    return Reset;
}