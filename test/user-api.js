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