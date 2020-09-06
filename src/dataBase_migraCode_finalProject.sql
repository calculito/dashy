drop table if exists links;
drop table if exists recordings;
drop table if exists homeworks;
drop table if exists classes;
drop table if exists class;
drop table if exists users;

CREATE TABLE class (
    id       		        SERIAL PRIMARY KEY,
  class_name                  VARCHAR(30) NOT NULL,
    UNIQUE (ID)
); 

CREATE TABLE users (
    id                      SERIAL PRIMARY KEY,
    name     		        VARCHAR(30) NOT NULL,
    class_id                INT REFERENCES  CLASS(ID),
    user_password           VARCHAR(50) NOT NULL,
    user_role           	VARCHAR(50) NOT NULL,
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
    class_id               INT REFERENCES CLASS(ID),
    link             VARCHAR(600),
    UNIQUE (ID)
);
CREATE TABLE homework_finished (
    id       		        SERIAL PRIMARY KEY,
    homeworks_id               INT REFERENCES HOMEWORKS(ID),
    user_id               INT REFERENCES USERS(ID),
    finished                VARCHAR(3),
    UNIQUE (ID)
);


CREATE TABLE recordings (
    id       		        SERIAL PRIMARY KEY,
    class_id               INT REFERENCES CLASS(ID),
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

CREATE TABLE perslinks (
    id       		        SERIAL PRIMARY KEY,
    user_id              INT REFERENCES USERS(ID),
    description             VARCHAR(600),
    UNIQUE (ID)
);
ALTER TABLE LINKS
ADD COLUMN PersOrGen VARCHAR(120) NOT NULL ;

ALTER TABLE recordings 
ADD COLUMN link VARCHAR(120) NOT NULL ;

ALTER TABLE links 
DROP COLUMN user_id;

SELECT class_name, users.name, users.user_role  FROM class
INNER JOIN users ON class.id=users.class_id;

select * from "class" c ; 

select name, user_password, user_role from "users" u; 

select name, user_password from "users" u where user_role ='Student'; 

select * from recordings r
inner join class c2 on c2.id = r.class_id 
inner join users u on u.class_id = c2.id where u.name = 'Thiago';

select name, h2.link , hf.finished  from users u 
inner join homework_finished hf on hf.user_id = u.id 
inner join homeworks h2 on h2.id = hf.homeworks_id 
where finished='yes' and u.name='Thiago'; 

select * from homeworks h;

select h.id, hf.finished, name, h.class_id, class_name, link from homework_finished hf
INNER JOIN users ON user_id=users.id
inner join class c2 on c2.id = users.class_id 
inner join homeworks h on h.id = hf.homeworks_id where h.class_id = '4' order by h.id asc;

select l.description from "class" c 
inner join links l on c.id = l.class_id where class_id=3; 

select * from links;

select description, name from perslinks p inner join users u on u.id = p.user_id where name='Michael';

