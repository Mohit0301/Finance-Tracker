const { DataTypes } = require("sequelize");
const {sequelize} = require("../db/connect-db");
const User = require("./user-model");

const Investment = sequelize.define("Investment", {
    //primary key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    //foreign key
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM,
        values: ["Cash Savings", "Mutual Funds", "Stocks", "Cryptocurrency",
            "Fixed Deposits", "Real Estate", "Other"],
        allowNull: false
    },
    institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL,
        validate: {
            min: 0
        },
        allowNull: false
    },
    investmentDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});

module.exports = Investment;