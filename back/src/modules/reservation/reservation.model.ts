import { DataTypes } from "sequelize";
import sequelize from "../../config/database.ts";

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'client',
            key: 'id'
        }
    },
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'staff',
            key: 'id'
        }
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    expiry_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reservation_status: {
        type: DataTypes.ENUM('pending', 'cancelled', 'completed', 'expired', 'active'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'reservation',
    timestamps: false
})

export default Reservation