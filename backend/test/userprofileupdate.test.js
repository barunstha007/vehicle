// const request = require("supertest");
// const expect = require("chai").expect;
// const app = require("../server");
// const users = require("../models/UserDetails.model");
// //const app = require("../server");
// const Mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// //npm run test -- --grep userprofile
// const config = require("config");

// describe("USERPROFILE", () => {
//     describe("GET:/", () => {
//         beforeEach(function(done) {
//             users.deleteMany({}, (err) => {
//                 if (err) return done(err);
//                 done();

//             })
//         });

//         it("FETCH USER FROM DATABASE", async() => {
//             const user1 = new users({
//                 username: "pabinasda",
//                 password: "12345jklm",
//                 name: "user1name",
//                 email: "userEmail@gmail.com",
//                 phone: "123456789",
//                 avatar: "pic.jpg",
//                 location: "userLocation",
//                 role: 1,
//                 assignedServiceCenter: 1

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

//         it("Update User In database", async() => {
//             const user1 = new users({
//                 username: "pabinasda",
//                 password: "12345jklm",
//                 name: "user1name",
//                 email: "userEmail@gmail.com",
//                 phone: "123456789",
//                 avatar: "pic.jpg",
//                 location: "userLocation",
//                 role: 1,
//                 assignedServiceCenter: 1

//             });
//             var user = await user1.save();
//             //new user details for update
//             const user2 = new users({
//                 username: "manita",
//                 password: "23423asdasd",
//                 name: "manita543",
//                 email: "manimew@gmail.com",
//                 phone: "4534534534",
//                 avatar: "pic.jpg",
//                 location: "userLocation",
//                 role: 1,
//                 assignedServiceCenter: 1

//             });

//             const res = await request(app).post("/profile/update/" + user._id).send(user2);
//             // console.log(res.body);
//             expect(res.status).equal(200);
//             expect(res.body).to.be.an("object");

//         })
//     });


// });