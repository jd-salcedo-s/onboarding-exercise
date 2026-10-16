# genre
- id
- description

# author
- id
- name

# book
- id
- author_id (FK)
- genre_id (FK)
- title
- publish_date
- is_booked (boolean)

# staff
- id
- name
- username
- password
- status (boolean)

# client
- id
- name
- phone_number
- email

# reservation 
- id
- client_id (FK)
- staff_id (FK)
- start_date
- expiry_date
- reservation_status

# reservation_status ENUM
- cancelled
- pending
- fulfilled
- expired
- available

# reservation_book
- reservation_id (FK)
- book_id (FK)


```mermaid
erDiagram
    genre {
        int id PK
        string description
    }
    author {
        int id PK
        string name
    }
    book {
        int id PK
        int author_id FK
        int genre_id FK
        string title
        date publish_date
        boolean is_booked
    }
    staff {
        int id PK
        string name
        string username
        string password
        boolean status
    }
    client {
        int id PK
        string name
        string phone_number
        string email
    }
    reservation {
        int id PK
        int client_id FK
        int staff_id FK
        date start_date
        date expiry_date
        reservation_status reservation_status
    }
    reservation_book {
        int reservation_id PK, FK
        int book_id PK, FK
    }
    genre ||--o{ book : contains
    author ||--o{ book : writes
    client ||--o{reservation : makes
    staff ||--o{reservation : supervises
    reservation ||--|{ reservation_book : contains
    book ||--o{ reservation_book : included_in
 
```