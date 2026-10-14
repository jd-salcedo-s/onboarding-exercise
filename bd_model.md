# genre
- id
- description

# author
- id
- name
- birth_date
- death_date (optional)

# book
- id
- author_id (FK)
- genre_id (FK)
- title
- isbn
- num_pages
- language
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
- book_id (FK)
- client_id (FK)
- start_date
- expiry_date
- reservation_status

# reservation_status ENUM
- cancelled
- pending
- fulfilled
- expired
- available