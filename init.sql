-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL
);

--select * from users;

-- Force clean slate
DROP TABLE IF EXISTS probate;

CREATE TABLE probate (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    probateid VARCHAR(20) UNIQUE,
    startdate DATE,
    enddate DATE,
    squad VARCHAR(10),
    classyear VARCHAR(10),
    student_id INTEGER UNIQUE
);

INSERT INTO probate (name, probateid, startdate, enddate, squad, classyear, student_id)
VALUES 
    ('John Doe', '123456789', '2026-04-06', '2027-04-06', 'CS-41', 'CY-30', 1001),
    ('John Smith', '987654321', '2026-04-06', '2027-04-06', 'CS-42', 'CY-31', 1002),
    ('Gray Ryan', '123789456', '2026-04-06', '2027-04-21', 'CS-43', 'CY-30', 1003),
    ('Franco Milio', '000000001', '2026-04-06', '2027-04-06', 'CS-44', 'CY-31', 1004);

-- Verify data was inserted
SELECT * FROM probate;