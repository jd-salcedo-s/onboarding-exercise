export type Genre = {
    id: Number,
    description: String   
}

export type GenreCreate = Omit<Genre, 'id'>
export type GenreUpdate = Partial<GenreCreate>