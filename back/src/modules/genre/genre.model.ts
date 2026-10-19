import { DataTypes } from "sequelize";
import sequelize from "../../config/database.ts";

const Genre = sequelize.define('Genre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'genre',
    timestamps: false
})

export default Genre