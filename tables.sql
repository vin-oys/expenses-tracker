CREATE TABLE
IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE
IF NOT EXISTS expenses
(
    id SERIAL PRIMARY KEY,
    users_id INTEGER,
    date DATE,
    type TEXT,
    amount INTEGER,
    description TEXT,
    uuid TEXT,
    CONSTRAINT fk_user
        FOREIGN KEY
(users_id)
            REFERENCES users
(id)
            ON
DELETE CASCADE
);