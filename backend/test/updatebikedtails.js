// const request = require("supertest");
// const expect = require("chai").expect;
// const bikedetails = require("../models/BikeDetails.model");
// const app = require("../server");
// const config = require("config");
// const Mongoose = require("mongoose");
// const BikeDetailsModel = require("../models/BikeDetails.model");
// const jwt = require("jsonwebtoken");

// describe("BIKEDETAILSUPDATE", () => {
//     describe("GET:/", () => {
//         beforeEach(function(done) {
//             bikedetails.deleteMany({}, (err) => {
//                 if (err) return done(err);
//                 done();

//             })
//         });

//         it("FETCH BIKEDEATILS FROM DATABASE", async() => {
//             const user1 = new bikedetails({
//             user:"5f308baba9e04132b8fbc7dd",
//             bikemodel: "",
//             bikenumber:"123",
//             odometer: "12",
//             date: "good",
    
//             role: 1,
//             assignedServiceCenter: 1
//             });
//             var user = await user1.save();
//             //create token
//             const payload = {
//                 user: {
//                     id: user.id,
//                     role: user.role
//                 }
//             };
//             var token = jwt.sign(
//                 payload,
//                 config.get("jwtSecret"), { expiresIn: 36000 }
//             );
//             // console.log(token);
//             var res = await request(app).get("/profile/user", user).set('x-auth-token', token);
//             //   console.log(res.body);
//             expect(res.status).equal(200);
//             expect(res.body).to.be.an("object");

//         });

//         it("Update Bikedeatils  In database", async() => {
//             const user1 = new bikedetails({
//                 user:"5f308baba9e04132b8fbc7dd",
//                 bikemodel: "",
//                 bikenumber:"123",
//                 odometer: "12",
//                 date: "2020/08/09",
//                 servicecenter:"",
//                 role: 1,
//                 assignedServiceCenter: 1

//             });
//             var user = await user1.save();
//             //new user details for update
//             const user3 = new bikedetails({
//                 bikemodel: "",
//                 bikenumber:"123",
//                 odometer: "12",
//                 date: "2019/09/09",
//                 role: 1,
//                 assignedServiceCenter: 1

//             });

//             const res = await request(app).post("/profile/update/" + user._id).send(user3);
//             // console.log(res.body);
//             expect(res.status).equal(200);
//             expect(res.body).to.be.an("object");

//         })
//     });

//     //cancael booking 

//     it("delete the  bike booking details ", async() => {
            
//         id=1
//         const res = await request(app).delete("/bikedetails/admin"+id);

//         expect(res.body).to.be.an("object");
//         expect(res.status).to.equal(200);



//     });


// });
