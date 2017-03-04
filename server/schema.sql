CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (

  id INT NOT NULL AUTO_INCREMENT,
  createdAt TIMESTAMP NOT NULL,
  text VARCHAR(100),
  roomId INT NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (  
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  PRIMARY KEY (id)
);


CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  PRIMARY KEY(id)
);

/*  Execute this file from the command line by typing:
 *  mysql -u root < server/schema.sql command creates 
 *  the database but to access it do : mysql -u root -p        
 *  to create the database and the tables.*/

