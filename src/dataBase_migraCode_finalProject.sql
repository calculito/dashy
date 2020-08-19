drop table if exists links;
drop table if exists recordings;
drop table if exists homeworks;
drop table if exists classes;
drop table if exists class;
drop table if exists users;


CREATE TABLE users (
    id                      SERIAL PRIMARY KEY,
    name     		        VARCHAR(30) NOT NULL,
    user_password           VARCHAR(50) NOT NULL,
    user_role           	VARCHAR(50) NOT NULL,
    UNIQUE (ID)
);




CREATE TABLE class (
    id       		        SERIAL PRIMARY KEY,
   user_id                  INT REFERENCES USERS(ID),
    UNIQUE (ID)
); 


CREATE TABLE classes (
    id       		        SERIAL PRIMARY KEY,
    class_id                INT REFERENCES  CLASS(ID),
    topic_class 		    VARCHAR(30) NOT NULL,
    date			        DATE NOT NULL,	 
    time_to_start           TIME NOT NULL,
    time_to_finish	        TIME NOT NULL,
    UNIQUE (ID)
); 



CREATE TABLE homeworks (
    id       		        SERIAL PRIMARY KEY,
    classes_id               INT REFERENCES CLASSES(ID),
    user_id               INT REFERENCES USERS(ID),
    finished                VARCHAR(30),
    description             VARCHAR(600),
    UNIQUE (ID)
);

CREATE TABLE recordings (
    id       		        SERIAL PRIMARY KEY,
    clases_id               INT REFERENCES CLASSES(ID),
    title                   VARCHAR(120) NOT NULL,
    UNIQUE (ID)
);

CREATE TABLE links (
    id       		        SERIAL PRIMARY KEY,
    user_id              INT REFERENCES USERS(ID),
    class_id	            INT REFERENCES CLASS(ID),
    description             VARCHAR(600),
    UNIQUE (ID)
);
select * from "class" c ;
SELECT users.name, users.user_role  FROM class
INNER JOIN users ON users.id=class.user_id;
