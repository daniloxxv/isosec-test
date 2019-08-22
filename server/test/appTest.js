const chai      = require('chai')
const chaiHttp  = require('chai-http')
const server    = require('../app')
const data      = require('./data.json')
const should    = chai.should()

chai.use(chaiHttp)

describe('Route tests', function(){
    it('Should get an array with all users', (done) =>{
        chai.request(server)
            .get('/users')
            .end((err,res) =>{
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(data.length)
                done()
            })
    })
    it('Should get user names and indexes', (done) =>{
        chai.request(server)
            .get('/users')
            .end((err,res) =>{
                res.body[0].name.should.not.be.eql(undefined)
                res.body[0].index.should.not.be.eql(undefined)
                done()
            })
    })
    it('Should accept name queries', (done) =>{
        chai.request(server)
            .get('/users?name=Williams')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                res.body[0].name.should.be.eql('Decker Williams')
                done()
            })
    })
    it('Should accept incomplete name queries', (done) =>{
        chai.request(server)
            .get('/users?name=ams')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                res.body[0].name.should.be.eql('Decker Williams')
                done()
            })
    })
    it('Should accept case insensitive name queries', (done) =>{
        chai.request(server)
            .get('/users?name=AMS')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                res.body[0].name.should.be.eql('Decker Williams')
                done()
            })
    })
    it('Should ignore non-alphanumeric input', (done) =>{
        chai.request(server)
            .get('/users?name=$$$$$')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(data.length)
                done()
            })
    })
    it('Should accept amount queries', (done) =>{
        chai.request(server)
            .get('/users?amount=5')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(5)
                done()
            })
    }) 
    it('Should return the full list for non-numeric amount queries', (done) =>{
        chai.request(server)
            .get('/users?amount=foo')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(data.length)
                done()
            })
    }) 
    it('Should accept amount and name queries at the same time', (done) =>{
        chai.request(server)
            .get('/users?amount=1&name=el')
            .end((err,res) =>{
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                should.equal(res.body[0].name.includes('el'),true)
                done()
            })
    })   
    it('Should accept user ids', (done) =>{
        chai.request(server)
            .get('/users/5d5de5732af9133fc25c1c3f')
            .end((err,res) =>{
                res.body.should.be.a('object')
                res.body.name.should.be.eql('Meyers Dyer')
                done()
            })
    })
    it('Should return null body for invalid ids', (done) =>{
        chai.request(server)
            .get('/users/5d5de5732af9133fc25c1c38')
            .end((err,res) =>{
                res.should.be.a('object')
                should.equal(res.body,null)
                done()
            })
    })
    it('Should accept requests for user information', (done) =>{
        chai.request(server)
            .get('/users/5d5de5732af9133fc25c1c3f/information')
            .end((err,res) =>{
                res.body.should.be.a('object')
                res.body.name.should.be.eql('Meyers Dyer')
                done()
            })
    })
    it('Should return the full information for a given user', (done) =>{
        const user = {"index":3,"picture":"http://placehold.it/32x32","age":36,"name":"Meyers Dyer","gender":"male","email":"meyersdyer@koogle.com","phone":"+1 (949) 502-2486","address":"406 Joval Court, Wright, Mississippi, 6619","registered":"2017-10-16T12:16:45 -01:00","friends":[{"id":0,"name":"Willie Griffith"},{"id":1,"name":"Christensen Woodward"},{"id":2,"name":"Garza Caldwell"},{"id":3,"name":"Kaitlin Hardin"},{"id":4,"name":"Jenna Cummings"}]}
        chai.request(server)
            .get('/users/5d5de5732af9133fc25c1c3f/information')
            .end((err,res) =>{
                ['name','address','picture','index','gender','age','friends','phone','email','address','registered'].forEach(el=>res.body[el].should.be.eql(user[el]))
                done()
            })
    })

})