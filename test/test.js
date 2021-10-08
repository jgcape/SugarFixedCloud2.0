var expect  = require("chai").expect;
var request = require("request");
var app = "http://localhost:8080"
var chai = require('chai')
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var TEST_ID = '615f6933a7266ba505cd6bc0';

// function loginUser() {
//     return function(done) {
//         chai.request(app)
//             .post('/login')
//             .send({ email: 'admin', password: 'admin1234' })
//             .end(onResponse);

//         function onResponse(err, res) {
//            if (err) return done(err);
//            return done();
//         }
//     };
// };

describe("Check POST /vison", function() {
    it("check api returns fail for unauthorized API trigger", function(done) {
        chai.request(app)
            .post('/api/vision')
            .end(function (err, res) {
                expect(res.body.statusCode).to.equal(400);               
                done();
        });
    })
});

describe("Check POST /vison/test", function() {
    it("check api is working with statusCode 200 on test payload", function(done) {
        chai.request(app)
            .post('/api/vision/test')
            .end(function (err, res) {
                expect(res.body.statusCode).to.equal(200);               
                done();
        });
    })
});

// describe("Check GET /sugars", function() {    
//     it('login', loginUser());
//     it("check api is working with statusCode 200", function(done) {
//         chai.request(app)
//             .get('/api/sugars')
//             .end(function (err, res) {
//                 expect(res.statusCode).to.equal(200);               
//                 done();
//             });
//         })
// });

describe("Check UPDATE /sugars", function() {    
    it("check api is working with statusCode 200", function(done) {
        chai.request(app)
            .patch(`/api/sugars/${TEST_ID}`)
            .send({newName : "UPDATED BY TEST"})
            .end(function (err, res) {
                expect(res.body.statusCode).to.equal(200);               
                done();
            });
    })
    it("check api is working with success message", function(done) {
        chai.request(app)
            .patch(`/api/sugars/${TEST_ID}`)
            .send({newName : "UPDATED BY TEST"})
            .end(function (err, res) {
                expect(res.body.message).to.equal("Sucess: product name updated");               
                done();
            });
    })
});

describe("Check DELETE /sugars", function() {    
    it("check api is working with statusCode 200", function(done) {
        chai.request(app)
            .delete(`/api/sugars/${TEST_ID}`)
            .end(function (err, res) {
                expect(res.body.statusCode).to.equal(200);               
                done();
            });
    })
    it("check api is working with success message", function(done) {
        chai.request(app)
            .delete(`/api/sugars/${TEST_ID}`)
            .end(function (err, res) {
                expect(res.body.message).to.equal("Sucess: product deleted");               
                done();
            });
    })
    it("check response contains deletedCount", function(done) {
        chai.request(app)
            .delete(`/api/sugars/${TEST_ID}`)
            .end(function (err, res) {
                expect(res.body.data).to.have.key("deletedCount");               
                done();
            });
    })
    it("check count of objects deleted", function(done) {
        chai.request(app)
            .delete(`/api/sugars/${TEST_ID}`)
            .end(function (err, res) {
                expect(res.body.data.deletedCount).to.be.oneOf([0,1]);            
                done();
            });
    })
});
