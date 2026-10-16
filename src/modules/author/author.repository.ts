import { where } from "sequelize";
import Author from "./author.model.ts";
import type { AuthorCreate, AuthorUpdate } from "./author.types.ts";

export class AuthorRepository {
    static async getAll() {
        return await Author.findAll()
    }

    static async getById(id: Number) {
        return await Author.findOne({
            where: {id}
        })
    }

    static async create(data: AuthorCreate) {
        const created_author = await Author.create({
            name: data.name
        })

        return created_author
    }

    static async update(id: Number, data: AuthorUpdate) {
        const updated_author = await Author.update(
            { name: data.name }, 
            { where: {id} }
        )

        return updated_author
    }

    static async delete(id: Number) {
        return await Author.destroy({
            where: {id}
        })
    }
}