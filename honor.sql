CREATE DATABASE honor;

\c honor \\

CREATE TABLE "probate" (
    "name" character varying(20),
    "probateid" character varying(9) PRIMARY KEY,
    "startdate" date,
    "enddate" date,
    "squad" character varying(5),
    "classYear" character varying(5)
)

CREATE TABLE "staff" (
    "name" character varying(20),
    "staffid" character varying(9),
    "squad" character varying(5),
    "admin" BOOLEAN
)