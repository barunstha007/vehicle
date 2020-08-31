// const request = require("supertest");
// const expect = require("chai").expect;
// const aap = require("../server");
// const users = require("../models/UserDetails.model");
// const app = require("../server");
// const Mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");


// describe("USER LOGIN : POST/", () => {
//     describe("USER CREDENTIALS", () => {
//         beforeEach(function(done) {
//             this.timeout(9000);
//             users.deleteOne({}, (err) => { 
//                 if (err) return done(err);
//                 done();
//             })
//         });
//         it("When username is empty it should return status:400", async() => {
//             const user = {
//                 username: "",
//                 password: "12345",
//             };
//             const res = await request(app).post("/auth/login").send(user);
//             expect(res.status).to.equal(400);
//         })
//         it("When password is empty it should return status:400", async() => {
//             const user = {
//                 username: "user123",
//                 password: "",
//             };
//             const res = await request(app).post("/auth/login").send(user);
//             expect(res.status).to.equal(400);
//         });
//         it("When user credentials is incorrect it should return msg 'Invalid credentials' with status 400", async() => {
//             const user = {
//                 username: "wringUsername",
//                 email: "wrongEmail",
//                 password: "wrongPassword",
//             };
//             const res = await request(app).post("/auth/login").send(user);
//             expect(res.status).to.equal(400);
//             // console.log(res)
//             expect(res.body.errors[0].msg).to.equal("Invalid credentials");
//         });
//         it("When user credentials is validt it should return Json Token", async() => {
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
//             // Encrypt password
//             const salt = await bcrypt.genSalt(10);
//             user1.password = await bcrypt.hash(user1.password, salt);
//             await user1.save();
//             //user credentials
//             const userCredentials = {
//                 username: "pabinasda",
//                 email: "userEmail@gmail.com",
//                 password: "12345jklm"
//             }
//             const res = await request(app).post("/auth/login").send(userCredentials);
//             //console.log(res.body);
//             expect(res.status).to.equal(200);
//             expect(res.body.token);
//             expect(res.body.role).to.equal(1);
//         });
//     });
// });