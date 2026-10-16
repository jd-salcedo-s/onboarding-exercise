import { DataTypes } from "sequelize";
import sequelize from "../../config/database.ts";

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'author',
    timestamps: false
})

export default Author