CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  createdAt TIMESTAMP NOT NULL,
  text VARCHAR(100),
  roomId INT NOT NULL,
  userId INT NOT NULL
);

/* Create other tables and define schemas for them here! */


/*tutorials_tbl(
   tutorial_id INT NOT NULL AUTO_INCREMENT,
   tutorial_title VARCHAR(100) NOT NULL,
   tutorial_author VARCHAR(40) NOT NULL,
   submission_date DATE,
   PRIMARY KEY ( tutorial_id )
);
*/


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

