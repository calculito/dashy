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

ALTER TABLE LINKS
ADD COLUMN PersOrGen VARCHAR(120) NOT NULL ;

select * from "class" c ; 

SELECT class_name, users.name, users.user_role  FROM class
INNER JOIN users ON class.id=users.class_id;

select homework_finished.finished, user_id, name from homework_finished
INNER JOIN users ON user_id=users.id;

select name, user_password from "users" u where user_role ='Student'; 


select name, user_password, user_role from "users" u; 
​

select name, user_role from "users" u
inner join class c on c.id = u.class_id 
inner join links l on c.id = l.class_id; 
​

select name, user_role from users u 
inner join homework_finished hf on hf.user_id = u.id 
inner join homework_finished hf2 on hf2.homeworks_id = hf.homeworks_id; 
​

select  users.name description from links l  
inner join users u2 on  l.user_id = u2.id 
inner join  class c on l.class_id = c.id;  
​
-- Retrive finished homework, name, role, topic, date --
select name, user_role, finished, topic_class, date from users u 
inner join homework_finished hf on u.id = hf.user_id 
inner join homeworks h on h.id = hf.homeworks_id inner join "class" c on h.class_id = c.id 
inner join classes c2 on c.id = c2.class_id;  

