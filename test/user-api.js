var should = require('should');
var assert = require('assert');
var supertest = require('supertest');

var server = supertest.agent('http://localhost:3000');

describe('Get all users', function() {

    it('should return all users', function(done) {
        server
            .get('/api/users')
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                else {
                    res.body.message[0].should.have.property('email');
                    res.body.message[0].should.have.property('password');
                }
                done();
            });
    });
});

describe('Create user', function() {
    var user = { password : 'password', email : 'marcus@marcus.com'}; 

    it('should create an user', function(done) {
        server
            .post('/api/users')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                else {
                    res.body.message[0].should.have.property('email');
                }
                done();
            });
    });
});

describe('Update user', function() {
    var user = { password : 'password_new', email : 'marcus@marcus.com'}; 

    it('should return the updated user', function(done) {
        server
            .put('/api/users/marcus@marcus.com')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                else {
                    res.body.message[0].should.have.property('email');
                }
                done();
            });
    });
});

describe('Delete user', function() {

    it('delete the user stated', function(done) {
        server
            .delete('/api/users/marcus@marcus.com')
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                else {
                    res.body.message[0].should.have.property('email');
                }
                done();
            });
    });
});

describe('Get one user', function() {

    it('should return one user', function(done) {
        server
            .get('/api/users/?email=asd@asd.com')
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                else {
                    res.body.message[0].should.have.property('email');
                    res.body.message[0].should.have.property('password');
                }
                done();
            });
    });
});