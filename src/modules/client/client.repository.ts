import Client from "./client.model.ts";

export class ClientRepository {
    static async getAll() {
        return await Client.findAll()
    }
}