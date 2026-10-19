export type Staff = {
    id: Number,
    name: String,
    username: String,
    password: String,
    status: Boolean
}

export type StaffCreate = Omit<Staff, 'id' | 'status'>
export type StaffUpdate = Partial<StaffCreate>