//database name SQL_practise

CREATE TABLE koalaHolla (
    id serial PRIMARY KEY,
    name VARCHAR(20),
    gender VARCHAR(1),
    age INTEGER,
    ready_for_transfer BOOLEAN,
    notes VARCHAR(200)
);