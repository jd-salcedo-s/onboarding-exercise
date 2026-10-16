import { DataTypes } from "sequelize";
import sequelize from "../../config/database.ts";

const ReservationBook = sequelize.define('ReservationBook', {
    reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'reservation',
            key: 'id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'book',
            key: 'id'
        }
    }
}, {
    tableName: 'reservation_book',
    timestamps: false
})

export default ReservationBook