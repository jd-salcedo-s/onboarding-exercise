import Book from "./book.model.ts";

export class BookRepository {
    static async getAll() {
        return await Book.findAll()
    }
}