import { Op } from "sequelize";
import Book from "./book.model.ts";
import type { BookCreate, BookUpdate } from "./book.types.ts";

export class BookRepository {
    static async getAll() {
        return await Book.findAll({
            include: [
                {
                    association: 'author',
                    attributes: ["name"],
                }
            ],
            attributes: {
                exclude: ["author_id", "genre_id"]
            }
        })
    }

    static async getById(id: Number) {
        return await Book.findOne({
            where: { id },
            include: [
                {
                    association: 'author',
                    attributes: ["name"]
                }
            ],
            attributes: {
                exclude: ["author_id", "genre_id"]
            }
        })
    }

    static async getByIds(ids: Number[]) {
        return await Book.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    static async create(data: BookCreate) {
        const is_booked = false

        const created_book = await Book.create({
            author_id: data.author_id,
            genre_id: data.genre_id,
            title: data.title,
            publish_date: data.publish_date,
            is_booked
        })

        return created_book
    }

    static async update(id: Number, data: BookUpdate) {
        const updated_book_count = await Book.update({
            author_id: data.author_id,
            genre_id: data.genre_id,
            title: data.title,
            publish_date: data.publish_date,
            is_booked: data.is_booked
        },
            { where: { id } }
        )

        return updated_book_count
    }

    static async delete(id: Number) {
        return await Book.destroy({
            where: { id }
        })
    }

    static async count(id: Number) {
        return await Book.count({
            where: { genre_id: id }
        })
    }
}