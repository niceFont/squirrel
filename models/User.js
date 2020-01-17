const Sequelize = require("sequelize")

const Model = Sequelize.Model

class User extends Model { }

const UserConfig = {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lasName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.SMALLINT,
        allowNull: false
    }
}

module.exports = {
    User, UserConfig
}