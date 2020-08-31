const request = require("supertest");
const expect = require("chai").expect;
// const aap = require("../../server");
// const servicecenter = require("../models/ServiceCenter.model");
const app = require("../../server");
const Mongoose = require("mongoose");
const users = require("../../models/UserDetails.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
describe("ADD MANAGER : POST/", () => {
    describe("SERVICE CENTER", () => {
        beforeEach(function(done) {
            this.timeout(9000);
            users.deleteMany({}, (err) => {
              if (err) return done(err);
                
                done();

            })
        });
                    it("When Username is empty it should return status:400", async() => {
                        const admin = {
                            username: "",
                            password: "12345jklm",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                           
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        };
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
            
                    });
                    it("When Username is Repeadted it should return status:400 with error message", async() => {
                        const admin = new users({
                            username: "user1",
                            password: "adasd123",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                           
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        });
            
                        await admin.save();
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
                        expect(res.body.error).to.lengthOf.greaterThan(0);
            
                    });
            
            
                    it("When Password is empty it should return status:400", async() => {
                        const admin = {
                            username: "user1",
                            password: "",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                           
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        };
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
            
                    });
                    it("When Name is empty it should return status:400", async() => {
                        const admin = {
                            username: "user1",
                            password: "12345jklm",
                            name: "",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                            
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        };
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
            
                    });
                    it("When Email is empty it should return status:400", async() => {
                        const admin = {
                            username: "user1",
                            password: "12345jklm",
                            name: "user1name",
                            email: "",
                            phone: "123456789",
                          
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        };
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
            
                    });
                    it("When Email Repeadted it should return status:400 with error message", async() => {
                        const admin = new users({
                            username: "user1",
                            password: "asdfg12314",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                           
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        });
            
                        await admin.save();
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
                        expect(res.body.error).to.lengthOf.greaterThan(0);
            
                    });
                    it("When Phone no is empty it should return status:400", async() => {
                        const admin = {
                            username: "user1",
                            password: "asdasd23123",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "",
                            avatar: "pic.jpg",
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        };
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
            
            
                    });
                    it("When Phone no is Repeadted it should return status:400 with error message", async() => {
                        const admin = new users({
                            username: "user1",
                            password: "asdas12312",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                           
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        });
            
                        await admin.save();
            
                        const res = await request(app).post("/register/").send(admin);
                        expect(res.status).to.equal(400);
                        expect(res.body.error[0].msg).to.equal("The phone number already exists");
            
                    });
            
            
                });
            
              
                describe("SAVE ADMIN TO DATABASE", () => {
                    beforeEach(function(done) {
                        this.timeout(9000);
                        users.deleteMany({}, (err) => {
                           if (err) return done(err);
                           
                            done();
            
                        })
                    });
                    it("When user is saved to database it should return user object with valid mongo id ", async() => {
                        const admin = {
                            username: "pabinasda",
                            password: "12345jklm",
                            name: "user1name",
                            email: "userEmail@gmail.com",
                            phone: "123456789",
                            location: "userLocation",
                            role: 1,
                            assignedServiceCenter: 1
            
                        };
            
                        const res = await request(app).post("/register /").send(admin);
                        expect(res.body).to.be.an("object");
                        expect(Mongoose.Types.ObjectId.isValid(res.body._id)).to.equal(true);
            
            
                    });
            
                });

                
            
            
            
            });


            //delete
        it("delete the sercice center", async() => {
            
            id=1
            const res = await request(app).delete("/admins/admin"+id);

            expect(res.body).to.be.an("object");
            expect(res.status).to.equal(200);



        });


 //update admin

            it("FETCH  ADMINS FROM DATABASE", async() => {
                const admins = new users({
                    username: "Manita",
                    password: "manita123",
                    name: "manita",
                    email: "manita@gmail.com",
                    phone: "9800959901",
                    location: "Dharan",
                    role: 1,
                    assignedServiceCenter: 1
                });
                var user = await admins.save();
                //create token
                const payload = {
                    admin: {  
                        id: user.id,
                        role: user.role
                    }
                };
                var token = jwt.sign(
                    payload,
                    config.get("jwtSecret"), { expiresIn: 36000 }
                );
                // console.log(token);
                var res = await request(app).get("/admins/",+user._id).set('x-auth-token', token);
                //console.log(res.body);
                expect(res.status).equal(200);
                expect(res.body).to.be.an("array");
                
            });


            it("Update ADMINS In database", async() => {
                const admins = new users({
                    username: "Manita Mewahang",
                    password: "manita123",
                    name: "manita",
                    email: "manita1@gmail.com",
                    phone: "98009599033",
                    location: "Dharan",
                    role: 1,
                    assignedServiceCenter: 1
                });
                var user = await admins.save();
                //create token
                const payload = {
                    admin: {
                        id: user.id,
                        role: user.role
                    }
                };
                var token = jwt.sign(
                    payload,
                    config.get("jwtSecret"), { expiresIn: 36000 }
                );
                //new user details for update
                const admins1 = {
                    username: "manita",
                    password: "23423asdasd",
                    name: "manita543",
                    email: "manimew@gmail.com",
                    phone: "4534534534",
                    avatar: "pic.jpg",
                    location: "userLocation",
                    role: 1,
                    assignedServiceCenter: 1
                };
                admins1.admin = "admins";
                // console.log(user2)
                const res = await request(app).post("/admins/update/" + users._id).send(admins).set('x-auth-token', token);
                // console.log(res.body);
                expect(res.status).equal(200);
                expect(res.body).to.be.an("object");
                
            }); 