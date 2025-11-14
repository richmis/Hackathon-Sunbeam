create database hackathon;

use hackathon;

--shares table
create table shares(
     review_id int,
     user_id int
     );


--users table
create table users(
    -> id int primary key auto_increment,
    -> first_name varchar(15),
    -> last_name varchar(15),
    -> email varchar(20) unique,
    -> password varchar(500),
    -> mobile varchar(10),
    -> birth date
    -> );


-- reviews table
create table reviews(
     review_id int primary key auto_increment,
     movie_id int,
     review varchar(1000),
     rating float,
     user_id int,
     modified DATETIME default CURRENT_TIMESTAMP,
     foreign key (user_id) references users(id)
     );

--movies table
create table movies(
movies_id int primary key auto_increment,
title varchar(20),
releaseDate date
);

