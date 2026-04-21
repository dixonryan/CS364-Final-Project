CREATE DATABASE honor;

\c honor;

CREATE TABLE probate (
    name VARCHAR(20),
    probateid VARCHAR(9),
    startdate VARCHAR(10),
    endDate VARCHAR(10),
    squad VARCHAR(5),
    classYear VARCHAR(5)
);

CREATE TABLE staff (
    --name VARCHAR(20),
    --staffid VARCHAR(9),
    --squad VARCHAR(5),
    --admin BOOLEAN,

    username VARCHAR(20),
    password VARCHAR(20)
);