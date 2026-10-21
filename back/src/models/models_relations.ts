import Author from "../modules/author/author.model.ts"
import Book from "../modules/book/book.model.ts"
import Client from "../modules/client/client.model.ts"
import Genre from "../modules/genre/genre.model.ts"
import Reservation from "../modules/reservation/reservation.model.ts"
import ReservationBook from "../modules/reservation/reservation_book.model.ts"
import Staff from "../modules/staff/staff.model.ts"

Book.belongsToMany(Reservation, {
    through: ReservationBook,
    foreignKey: 'book_id',
    otherKey: 'reservation_id',
    as: 'reservations'
})

Book.belongsTo(Author, {
    foreignKey: 'author_id',
    as: 'author'
})

Book.belongsTo(Genre, {
    foreignKey: 'genre_id',
    as: 'genre'
})

Genre.hasMany(Book, {
    foreignKey: 'genre_id',
    as: 'books'
})

Staff.hasMany(Reservation, {
    foreignKey: 'staff_id',
    as: 'reservations'
})

Author.hasMany(Book, {
    foreignKey: 'author_id',
    as: 'books'
})

Client.hasMany(Reservation, {
    foreignKey: 'client_id',
    as: 'reservations'
})

Reservation.belongsToMany(Book, {
    through: ReservationBook,
    foreignKey: 'reservation_id',
    otherKey: 'book_id',
    as: 'books'
})

Reservation.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
})

Reservation.belongsTo(Staff, {
    foreignKey: 'staff_id',
    as: 'staff'
})