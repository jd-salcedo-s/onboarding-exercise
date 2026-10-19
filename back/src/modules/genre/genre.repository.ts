import Genre from "./genre.model.ts";
import type { GenreCreate, GenreUpdate } from "./genre.types.ts";

export class GenreRepository {
    static async getAll() {
        return await Genre.findAll()
    }

     static async getById(id: Number) {
        return await Genre.findOne({
            where: {id}
        })
    }

    static async create(data: GenreCreate) {
        const created_genre = await Genre.create({
            description: data.description
        })

        return created_genre
    }

    static async update(id: Number, data: GenreUpdate) {
        const updated_genre = await Genre.update(
            { description: data.description }, 
            { where: {id} }
        )

        return updated_genre
    }

    static async delete(id: Number) {
        return await Genre.destroy({
            where: {id}
        })
    }
}