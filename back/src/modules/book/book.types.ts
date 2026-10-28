export type Book = {
    id: Number,
    author_id: Number,
    genre_id: Number,
    title: String,
    publish_date: Date,
    is_booked: Boolean
}

export type BookCreate = Omit<Book, 'id' | 'is_booked'>
export type BookUpdate = Partial<Omit<Book, 'id' | 'is_booked'>>