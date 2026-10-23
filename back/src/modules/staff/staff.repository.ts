import { generateToken } from "../../utils/jwt.ts";
import Staff from "./staff.model.ts";
import type { StaffCreate, StaffUpdate } from "./staff.types.ts";

export class StaffRepository {
    static async getAll() {
        return await Staff.findAll()
    }

    static async getById(id: Number) {
        return await Staff.findOne({
            where: { id }
        })
    }

    static async update(id: Number, data: StaffUpdate) {
        const updated_staff = await Staff.update({
            name: data.name,
            username: data.username,
            password: data.password,
            role: data.role
        },
            { where: { id } }
        )

        return updated_staff
    }

    static async delete(id: Number) {
        return await Staff.destroy({
            where: { id }
        })
    }

    static async findByUsername(username: String) {
        return await Staff.findOne({
            where: { username }
        })
    }

    static async create(data: StaffCreate) {
        const created_staff = await Staff.create({
            name: data.name,
            username: data.username,
            password: data.password,
            role: data.role
        })

        const staffId = created_staff.get('id')
        if (typeof staffId !== 'number' || !Number.isSafeInteger(staffId) || staffId <= 0) {
            throw new Error('Invalid staff ID');
        }

        return created_staff
    }
}