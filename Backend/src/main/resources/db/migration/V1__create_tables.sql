select 'create database enterprisedb' where not exists (select from pg_database where datname = 'enterprisedb');

create table user_account (
    user_id serial primary key,
    username char(20) not null,
    user_email text not null,
    user_password text not null
);

create table project (
    project_id serial primary key,
    project_name char(50) not null,
    user_id int references user_account (user_id)
);

create table project_user (
    project_id int references project (project_id) on delete cascade,
    user_id int references user_account (user_id) on delete cascade,
    primary key (project_id, user_id)
);

create type priority as enum ('low', 'medium', 'high');

create table task (
    task_id serial primary key ,
    task_name text not null ,
    task_label char(20),
    task_detail text,
    task_priority priority,
    completed boolean default false,
    project_id int references project (project_id)
);

create table task_user (
    task_id int references task (task_id) on delete cascade,
    user_id int references user_account (user_id) on delete cascade,
    primary key (task_id, user_id)
);

create table file (
    file_id serial primary key ,
    file_name char(50) ,
    project_id int references project (project_id),
    user_id int references user_account (user_id)
);