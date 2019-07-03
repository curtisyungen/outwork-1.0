module.exports = function(sequelize, DataTypes) {
    let Users = sequelize.define("Users", {
        // Unique userID
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // User's first name
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // User's last name
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // User's email address, used for login
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // User's password, encrypted via bcrypt
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        // User's current weight in pounds, optional
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // User's account privacy setting: public or private
        privacy: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    
    return Users;
}