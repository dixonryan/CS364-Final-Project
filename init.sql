-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL
);

select * from users;

