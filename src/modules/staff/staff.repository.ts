import Staff from "./staff.model.ts";

export class StaffRepository {
    static async getAll() {
        return await Staff.findAll()
    }
}