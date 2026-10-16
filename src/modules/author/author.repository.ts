import Author from "./author.model.ts";

export class AuthorRepository {
    static async getAll() {
        return await Author.findAll()
    }
}