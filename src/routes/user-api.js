/*
 * Author: Deleepa
 * Description: Defines all the routes for the user table
 */

//init the required modules
import { Router } from 'express';
import { executeQuery, executeGetQuery } from '../utils/database';
import { checkUndefinedType, validateEmail, validatePassword, encryptPassword } from '../utils/helper';

//table name that this router is linked to
const TABLE_NAME = 'user';

class UserApiRouter extends Router {

    constructor() {
        super();

        this.get('/' , function (request, response) {
            console.log('retrieving users');
            let query = '';
            //check if user is specifying an email
            if(typeof request.query.email !== 'undefined') {
                query = `SELECT * FROM ${TABLE_NAME} WHERE email = "${request.query.email}"`;
            } else {
                query = `SELECT * FROM ${TABLE_NAME}`;
            }
            executeGetQuery(query, response);
        });

        this.delete('/:email', function (request, response) {
            console.log('deleting provided user from user table');
            checkUndefinedType(request.params.email, response);
            const query = `DELETE FROM ${TABLE_NAME} WHERE email = "${request.params.email}"`;
            executeQuery(query, response, request.params.email);
        });

        this.post('/', function (request, response) {
            console.log('posting to user table');
            validateEmail(request.body.email, response);
            validatePassword(request.body.password, response);
            const encryptedPass = encryptPassword(request.body.password);
            const query = `INSERT INTO ${TABLE_NAME} (email, password) VALUES ("${request.body.email}", "${encryptedPass}")`;
            executeQuery(query, response, request.body.email);
        });

        this.put('/:email', function (request, response) {
            console.log('updating user table');
            checkUndefinedType(request.params.email, response);
            validatePassword(request.body.password, response);
            const encryptedPass = encryptPassword(request.body.password);
            const query = `UPDATE ${TABLE_NAME} SET password = "${encryptedPass}" WHERE email = "${request.params.email}"`;
            executeQuery(query, response, request.params.email);
        });

    }

}

export default new UserApiRouter();
