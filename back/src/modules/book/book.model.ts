import { DataTypes } from "sequelize";
import sequelize from "../../config/database.ts";

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'author',
            key: 'id'
        }
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'genre',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publish_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    is_booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'book',
    timestamps: false
})

export default Book