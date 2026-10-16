import Genre from "./genre.model.ts";

export class GenreRepository {
    static async getAll() {
        return await Genre.findAll()
    }
}