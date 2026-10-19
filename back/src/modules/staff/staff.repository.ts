import Staff from "./staff.model.ts";
import type { StaffCreate, StaffUpdate } from "./staff.types.ts";

export class StaffRepository {
    static async getAll() {
        return await Staff.findAll()
    }

    static async getById(id: Number) {
        return await Staff.findOne({
            where: {id}
        })
    }

    static async create(data: StaffCreate) {
        const created_staff = await Staff.create({
            name: data.name,
            username: data.username,
            password: data.password
        })

        return created_staff
    }

    static async update(id: Number, data: StaffUpdate) {
        const updated_staff = await Staff.update({
            name: data.name,
            username: data.username,
            password: data.password 
        }, 
            { where: {id} }
        )

        return updated_staff
    }

    static async delete(id: Number) {
        return await Staff.destroy({
            where: {id}
        })
    }
}