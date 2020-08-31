const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../server");
const users = require("../../models/UserDetails.model");
//const app = require("../server");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//npm run test -- --grep userprofile
const config = require("config");
describe("ADMINPROFILE", () => {
    describe("GET:/", () => {
        beforeEach(function(done) {
            this.timeout(9000);
            users.deleteMany({}, (err) => {
                if (err) return done(err);
                done();
            })
        });
        it("FETCH SUPER ADMIN FROM DATABASE", async() => {
            const user1 = new users({
                username: "Manita",
                password: "manita123",
                name: "manita",
                email: "manita@gmail.com",
                phone: "9800959901",
                avatar: "pic.jpg",
                location: "Dharan",
                role: 1,
                assignedServiceCenter: 1
            });
            var user = await user1.save();
            //create token
            const payload = {
                user: {  
                    id: user.id,
                    role: user.role
                }
            };
            var token = jwt.sign(
                payload,
                config.get("jwtSecret"), { expiresIn: 36000 }
            );
            // console.log(token);
            var res = await request(app).get("/superadmin/", user).set('x-auth-token', token);
            //console.log(res.body);
            expect(res.status).equal(200);
            expect(res.body).to.be.an("array");
        });
        it("Update SUPER ADMIN In database", async() => {
            const superAdmin = new users({
                username: "Manita limbu",
                password: "manita123",
                name: "manita",
                email: "manita@gmail.com",
                phone: "9800959901",
                avatar: "pic.jpg",
                location: "Dharan",
                role: 1,
                assignedServiceCenter: 1
            });
            var user = await superAdmin.save();
            //create token
            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };
            var token = jwt.sign(
                payload,
                config.get("jwtSecret"), { expiresIn: 36000 }
            );



//delete
            
        it("delete the super-admin", async() => {
            
            id=1
            const res = await request(app).delete("/superadmin/admin"+id);

            expect(res.body).to.be.an("object");
            expect(res.status).to.equal(200);



        });
            //new user details for update
            const user2 = {
                username: "sami",
                password: "23423asdasd",
                name: "manita543",
                email: "sami@gmail.com",
                phone: "4534534534",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1
            };
            user2.superadmin = "superadmin";
            // console.log(user2)
            const res = await request(app).post("/superadmin/update/" + user._id).send(user2).set('x-auth-token', token);
            // console.log(res.body);
            expect(res.status).equal(200);
            expect(res.body).to.be.an("object");
        });
        it("When SuperAdmin is saved to database it should return user object with valid mongo id ", async() => {
            const superAdmin = new users({
                username: "pabinasda",
                password: "12345jklm",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1
            });
            var user = await superAdmin.save();
            //create token
            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };
            var token = jwt.sign(
                payload,
                config.get("jwtSecret"), { expiresIn: 36000 }
            );



            const superadmin2 = {
                username: "Maichale jackson",
                password: "12345jklm2",
                name: "user1name2",
                email: "userEmail2@gmail.com",
                phone: "1234567892",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1
            };
            const res = await request(app).post("/superadmin/register").send(superadmin2).set('x-auth-token', token);
            // console.log(res.body)
            expect(res.body).to.be.an("object");
            expect(Mongoose.Types.ObjectId.isValid(res.body._id)).to.equal(true);

        });

    });

});