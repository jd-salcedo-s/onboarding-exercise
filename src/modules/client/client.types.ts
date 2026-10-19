export type Client = {
    id: Number,
    name: String,
    phone_number: String,
    email: String
}

export type ClientCreate = Omit<Client, 'id'>
export type ClientUpdate = Partial<ClientCreate>