## Simple API Server

This project is intended to serve as a starting point for anyone that wants to set up a simple NodeJS API server really fast. It's functionality is similar to a boilerplate. I started this mostly for my reference but I hope this ends up helping more people!

Eventually this I want to have a user login module as well, since that's a really basic feature that's part of any API server application. Authenticated routes would also be included.

### Stack

The stack that I've used for this server is:
* NodeJS with ExpressJS
* MySQL database
* Mocha with Supertest and Should for testing

## Installation

### Set up the database

The server is designed to connect to a MySQL database. Since most people learn SQL before any other type of database. The user table creation script can be found in the `scripts` folder. The same code is also shown below:

```
create table user (
	id int auto_increment not null primary key,
    email varchar(255),
    password varchar(255)
);

```

### Set up the project
```
git clone https://github.com/deleepa/simple-api.git
cd simple-api
npm install
node app.js
```

## Docker Compose Development Environment
* Run `docker-compose up` to start the development environment
* Run these commands to populate the database-
    1. `docker exec -it sas-db-server /bin/bash`
    2. `mysql simple-api-server < /tmp/scripts/create_user_table.sql`

## Tests

I'm using the mocha test framework for this project. To run unit tests you need to be in the root directory and server must be running.
```
mocha test
```

## Contributors

Contributors are more than welcome. The contribution guidelines aren't strict at all. Just have a look at the CONTRIBUTING.md file :)

## License

MIT.