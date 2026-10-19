import Client from "./client.model.ts";
import type { ClientCreate, ClientUpdate } from "./client.types.ts";

export class ClientRepository {
    static async getAll() {
        return await Client.findAll()
    }

     static async getById(id: Number) {
        return await Client.findOne({
            where: {id}
        })
    }

    static async create(data: ClientCreate) {
        const created_client = await Client.create({ 
            name: data.name,
            phone_number: data.phone_number,
            email: data.email 
        })

        return created_client
    }

    static async update(id: Number, data: ClientUpdate) {
        const updated_client_count = await Client.update({ 
            name: data.name,
            phone_number: data.phone_number,
            email: data.email 
        }, 
            { where: {id} }
        )

        return updated_client_count
    }

    static async delete(id: Number) {
        return await Client.destroy({
            where: {id}
        })
    }
}