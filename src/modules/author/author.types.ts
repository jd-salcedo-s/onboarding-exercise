export type Author = {
    id: Number,
    name: String
}

export type AuthorCreate = Omit<Author, 'id'>
export type AuthorUpdate = Partial<AuthorCreate>