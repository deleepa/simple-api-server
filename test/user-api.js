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

describe('Delete user', function() {

    it('delete the user stated', function(done) {
        server
            .delete('/api/users/test@test.com')
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
                    res.body.message[0].should.have.property('password');
                }
                done();
            });
    });
});

describe('Get one user', function() {

    it('should return one users', function(done) {
        server
            .get('/api/users/1')
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
