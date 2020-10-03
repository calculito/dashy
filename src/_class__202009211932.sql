-- public."class" definition
 -- Drop table
 -- DROP TABLE public."class";

CREATE TABLE public."class" (id serial NOT NULL,
                                       class_name varchar(30) NOT NULL,
                                                              CONSTRAINT class_pkey PRIMARY KEY (id));

-- public.users definition
 -- Drop table
 -- DROP TABLE public.users;

CREATE TABLE public.users (id serial NOT NULL,
                                     "name" varchar(30) NOT NULL,
                                                        class_id int4 NULL,
                                                                      user_password varchar(50) NOT NULL,
                                                                                                user_role varchar(50) NOT NULL,
                                                                                                                      CONSTRAINT users_pkey PRIMARY KEY (id));

-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT users_class_id_fkey
FOREIGN KEY (class_id) REFERENCES class(id);

-- public.homeworks definition
 -- Drop table
 -- DROP TABLE public.homeworks;

CREATE TABLE public.homeworks (id serial NOT NULL,
                                         class_id int4 NULL,
                                                       link varchar(600) NULL,
                                                                         optional varchar NULL,
                                                                                          CONSTRAINT homeworks_pkey PRIMARY KEY (id));

-- public.homeworks foreign keys

ALTER TABLE public.homeworks ADD CONSTRAINT homeworks_class_id_fkey
FOREIGN KEY (class_id) REFERENCES class(id);

-- public.classes definition
 -- Drop table
 -- DROP TABLE public.classes;

CREATE TABLE public.classes (id serial NOT NULL,
                                       class_id int4 NOT NULL,
                                                     title varchar(30) NOT NULL,
                                                                       tdate timestamptz NOT NULL,
                                                                                         tstart time NOT NULL,
                                                                                                     tend time NOT NULL,
                                                                                                               CONSTRAINT classes_pkey PRIMARY KEY (id));

-- public.classes foreign keys

ALTER TABLE public.classes ADD CONSTRAINT classes_class_id_fkey
FOREIGN KEY (class_id) REFERENCES class(id);

-- public.homework_finished definition
 -- Drop table
 -- DROP TABLE public.homework_finished;

CREATE TABLE public.homework_finished (id serial NOT NULL,
                                                 homeworks_id int4 NULL,
                                                                   user_id int4 NULL,
                                                                                finished varchar(3) NULL,
                                                                                                    linkhwfinished varchar(200) NULL,
                                                                                                                                hammer int4 NULL,
                                                                                                                                            CONSTRAINT homework_finished_pkey PRIMARY KEY (id));

-- public.homework_finished foreign keys

ALTER TABLE public.homework_finished ADD CONSTRAINT homework_finished_homeworks_id_fkey
FOREIGN KEY (homeworks_id) REFERENCES homeworks(id);


ALTER TABLE public.homework_finished ADD CONSTRAINT homework_finished_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id);

-- public.links definition
 -- Drop table
 -- DROP TABLE public.links;

CREATE TABLE public.links (id serial NOT NULL,
                                     class_id int4 NULL,
                                                   description varchar(600) NULL,
                                                                            stars int4 NULL,
                                                                                       CONSTRAINT links_pkey PRIMARY KEY (id));

-- public.links foreign keys

ALTER TABLE public.links ADD CONSTRAINT links_class_id_fkey
FOREIGN KEY (class_id) REFERENCES class(id);

-- public.perslinks definition
 -- Drop table
 -- DROP TABLE public.perslinks;

CREATE TABLE public.perslinks (id serial NOT NULL,
                                         user_id int4 NULL,
                                                      description varchar(600) NULL,
                                                                               stars int4 NULL,
                                                                                          CONSTRAINT perslinks_pkey PRIMARY KEY (id));

-- public.perslinks foreign keys

ALTER TABLE public.perslinks ADD CONSTRAINT perslinks_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id);

-- public.recordings definition
 -- Drop table
 -- DROP TABLE public.recordings;

CREATE TABLE public.recordings (id serial NOT NULL,
                                          class_id int4 NULL,
                                                        title varchar(120) NOT NULL,
                                                                           link varchar(120) NOT NULL,
                                                                                             keyword varchar NULL,
                                                                                                             CONSTRAINT recordings_pkey PRIMARY KEY (id));

-- public.recordings foreign keys

ALTER TABLE public.recordings ADD CONSTRAINT recordings_class_id_fkey
FOREIGN KEY (class_id) REFERENCES class(id);

-- FROM HERE DATA INSERT --

INSERT INTO public."class" (class_name)
VALUES ('20mar1') ,('20mar2') ,('20oct1') ,('20oct2') ;


INSERT INTO public.classes (class_id,title,tdate,tstart,tend)
VALUES (4,
        'Job fair',
        '2020-10-01 00:00:00.000',
        '18:00:00',
        '19:00:00') ,(4,
                      'Graduation',
                      '2020-10-03 00:00:00.000',
                      '15:00:00',
                      '18:00:00') ,(3,
                                    'Presentation project',
                                    '2020-09-16 00:00:00.000',
                                    '19:00:00',
                                    '22:00:00') ,(4,
                                                  'Final project',
                                                  '2020-09-02 00:00:00.000',
                                                  '18:00:00',
                                                  '22:00:00') ,(3,
                                                                'Job fair',
                                                                '2020-09-16 00:00:00.000',
                                                                '18:00:00',
                                                                '19:00:00') ,(3,
                                                                              'Presentation',
                                                                              '2020-09-16 00:00:00.000',
                                                                              '19:00:00',
                                                                              '22:00:00') ,(3,
                                                                                            'Presentation',
                                                                                            '2020-09-30 00:00:00.000',
                                                                                            '19:00:00',
                                                                                            '22:00:00') ,(3,
                                                                                                          'Job fair',
                                                                                                          '2020-10-01 00:00:00.000',
                                                                                                          '18:00:00',
                                                                                                          '19:00:00') ,(3,
                                                                                                                        'Graduation',
                                                                                                                        '2020-10-03 00:00:00.000',
                                                                                                                        '15:00:00',
                                                                                                                        '18:00:00') ,(4,
                                                                                                                                      'Job fair',
                                                                                                                                      '2020-09-16 00:00:00.000',
                                                                                                                                      '18:00:00',
                                                                                                                                      '19:00:00') ;


INSERT INTO public.classes (class_id,title,tdate,tstart,tend)
VALUES (4,
        'Presentation',
        '2020-09-16 00:00:00.000',
        '19:00:00',
        '22:00:00') ,(3,
                      'Final project',
                      '2020-09-02 00:00:00.000',
                      '18:00:00',
                      '22:00:00') ,(4,
                                    'Presentation',
                                    '2020-09-30 00:00:00.000',
                                    '19:00:00',
                                    '22:00:00') ;


INSERT INTO public.users ("name",class_id,user_password,user_role)
VALUES ('Jose',
        4,
        'Jose',
        'Student') ,('Thiago',
                     4,
                     'Thiago',
                     'Student') ,('Ion',
                                  4,
                                  'Ion',
                                  'Student') ,('Vincent',
                                               4,
                                               'Vincent',
                                               'Instructor') ,('VincentA',
                                                               NULL,
                                                               'VincentA',
                                                               'Admin') ,('CarlosA',
                                                                          NULL,
                                                                          'CarlosA',
                                                                          'Admin') ,('Carlos',
                                                                                     4,
                                                                                     'Carlos',
                                                                                     'Instructor') ,('Abdo',
                                                                                                     1,
                                                                                                     'Abdo',
                                                                                                     'Student') ,('Said ',
                                                                                                                  1,
                                                                                                                  'Said ',
                                                                                                                  'Student') ,('Kristiina ',
                                                                                                                               1,
                                                                                                                               'Kristiina',
                                                                                                                               'Student') ;


INSERT INTO public.users ("name",class_id,user_password,user_role)
VALUES ('Mouaz',
        1,
        'Mouaz',
        'Student') ,('Oleksandr',
                     1,
                     'Oleksandr',
                     'Student') ,('Rahaf',
                                  1,
                                  'Rahaf',
                                  'Student') ,('Housni',
                                               1,
                                               'Housni',
                                               'Student') ,('Rakibul',
                                                            1,
                                                            'Rakibul',
                                                            'Student') ,('Ward',
                                                                         1,
                                                                         'Ward',
                                                                         'Student') ,('Roshan',
                                                                                      3,
                                                                                      'Roshan',
                                                                                      'Student') ,('Ümit',
                                                                                                   3,
                                                                                                   'Ümit',
                                                                                                   'Student') ,('Thony',
                                                                                                                3,
                                                                                                                'Thony',
                                                                                                                'Student') ,('Joaquin',
                                                                                                                             3,
                                                                                                                             'Joaquin',
                                                                                                                             'Student') ;


INSERT INTO public.users ("name",class_id,user_password,user_role)
VALUES ('Rubén',
        3,
        'Rubén',
        'Student') ,('Lavinia',
                     3,
                     'Lavinia',
                     'Student') ,('Alejandro',
                                  3,
                                  'Alejandro',
                                  'Student') ,('Viktoryia',
                                               3,
                                               'Viktoryia',
                                               'Student') ,('Gustavo',
                                                            3,
                                                            'Gustavo',
                                                            'Student') ,('Anandamaya',
                                                                         3,
                                                                         'Anandamaya',
                                                                         'Student') ,('Shaheen',
                                                                                      3,
                                                                                      'Shaheen',
                                                                                      'Student') ,('AlexeiR',
                                                                                                   4,
                                                                                                   'Alexei',
                                                                                                   'Student') ,('AlexeiG',
                                                                                                                4,
                                                                                                                'Alexei',
                                                                                                                'Student') ,('Ehsan',
                                                                                                                             4,
                                                                                                                             'Ehsan',
                                                                                                                             'Student') ;


INSERT INTO public.users ("name",class_id,user_password,user_role)
VALUES ('Esteban',
        4,
        'Esteban',
        'Student') ,('Jorge',
                     4,
                     'Jorge',
                     'Student') ,('Josel',
                                  4,
                                  'Josel',
                                  'Student') ,('Ricardo',
                                               4,
                                               'Ricardo',
                                               'Student') ,('Kamel',
                                                            4,
                                                            'Kamel',
                                                            'Instructor') ;


INSERT INTO public.homework_finished (homeworks_id,user_id,finished,linkhwfinished,hammer)
VALUES (4,
        3,
        'yes',
        'test',
        4) ,(4,
             1,
             'yes',
             NULL,
             3) ,(4,
                  2,
                  'yes',
                  NULL,
                  1) ,(5,
                       3,
                       'yes',
                       NULL,
                       3) ,(2,
                            3,
                            'yes',
                            'https://fullcalendar.io/docs/event-object',
                            NULL) ;


INSERT INTO public.homeworks (class_id,link,optional)
VALUES (3,
        'Presentation final project',
        NULL) ,(4,
                'Presentation final project',
                NULL) ,(4,
                        'Participate to the job fair',
                        'no') ,(3,
                                'Working on final project',
                                'no') ,(4,
                                        'Working on final project',
                                        'no') ;


INSERT INTO public.links (class_id,description,stars)
VALUES (4,
        'https://trello.com/b/DAdHP2Ij/agile-sprint-board',
        4) ,(3,
             'https://docs.google.com/document/d/1iZcrGtYV7aoNCpZtKWRUCM2kGvmO2HfBM5btVhSG4yc/edit',
             3) ,(4,
                  'twertsgsdg',
                  3) ,(4,
                       'https://philip-popoff.net/#/',
                       NULL) ,(4,
                               'https://migradashy.herokuapp.com/',
                               NULL) ,(4,
                                       'https://fullcalendar.io/docs/event-object',
                                       2) ;


INSERT INTO public.perslinks (user_id,description,stars)
VALUES (5,
        'https://www.flaticon.com/packs/essential-set-2/5?word=smashicons',
        NULL) ,(3,
                'https://www.guru99.com/postgresql-create-database.html',
                4) ,(3,
                     'https://meet.google.com/upq-oadx-tqx',
                     5) ,(4,
                          'https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/',
                          5) ,(4,
                               'https://www.twilio.com/blog/react-app-with-node-js-server-proxy',
                               3) ,(2,
                                    'https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c',
                                    2) ,(2,
                                         'https://www.design-seeds.com/in-nature/heavens/color-set-6/',
                                         3) ;


INSERT INTO public.recordings (class_id,title,link,keyword)
VALUES (3,
        'Recording of the class from 01.08.2020',
        'https://drive.google.com/file/d/1yki3bmTAsr9GAE8q8sca0xJnlJHGM6uR/view?usp=sharing',
        NULL) ,(3,
                'Recording of the class from 05.08.2020',
                'https://drive.google.com/file/d/1jWseqU2_G0Nq5labZRYA8VPgPuq3Bib7/view?usp=sharing',
                NULL) ,(3,
                        'Recording of the class from 08.08.2020',
                        'https://drive.google.com/file/d/1Wq35JgDGYqFPFwZRb3m9NjEfissjgZfj/view?usp=sharing',
                        NULL) ,(3,
                                'Recording of the class from 11.08.2020',
                                'https://drive.google.com/file/d/1Wq35JgDGYqFPFwZRb3m9NjEfissjgZfj/view?usp=sharing',
                                NULL) ,(4,
                                        'Recording of the class from 01.08.2020',
                                        'https://drive.google.com/file/d/1rlDg00RkYEdvw7yFBf0kVflVzwxtQsh6/view?usp=sharing',
                                        NULL) ,(4,
                                                'Recording of the class from 05.08.2020',
                                                'https://drive.google.com/file/d/1CKgSgGuB3omvmLG7D6nTzCq_xNeQnDnr/view?usp=sharing',
                                                NULL) ,(4,
                                                        'Recording of the class from 08.08.2020',
                                                        'https://drive.google.com/file/d/1Y-bQ1AUljKidyThpWdV7LX4vNfrJ72H6/view?usp=sharing',
                                                        NULL) ,(4,
                                                                'Recording of the class from 11.08.2020',
                                                                'https://drive.google.com/file/d/1Y-bQ1AUljKidyThpWdV7LX4vNfrJ72H6/view?usp=sharing',
                                                                NULL) ;