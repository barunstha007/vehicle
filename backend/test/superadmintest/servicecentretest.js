const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../server");
const serviceCenter = require("../../models/ServiceCenter.model");
const users = require("../../models/UserDetails.model");

const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("SERVICE CENTER", () => {
  describe("POST", () => {
    beforeEach(function (done) {
      this.timeout(9000);
      users.deleteMany({}, (err) => {
        if (err) return done(err);
        serviceCenter.deleteMany({}, (err) => {
          if (err) return done(err);
          done();
        });
      });
    });

    it("save service center to database", async () => {
      //login and register super admin
      const superAdmin = new users({
        username: "pabinasda",
        password: "12345jklm",
        name: "user1name",
        email: "userEmail@gmail.com",
        phone: "123456789",
        avatar: "pic.jpg",
        location: "userLocation",
        role: 1,
        assignedServiceCenter: 1,
      });
      var user = await superAdmin.save();
      //  create token
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      var token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000,
      });
      //create service center
      const serviceCenter1 = new serviceCenter({
        admin: user.id,
        name: "service center 1",
        serviceLocation: "KATHMANDU",
        bookingLimit: 5,
        bookingCount: 0,
      });
      // //save service center
      const res = await request(app)
        .post("/service-center/")
        .send(serviceCenter1)
        .set("x-auth-token", token);
      expect(res.body).to.be.an("object");
      expect(res.status).to.equal(200);
    });

    it("get Assigned Service Center of Amin", async () => {
      //login and register super admin
      const superAdmin = new users({
        username: "pabinasda",
        password: "12345jklm",
        name: "user1name",
        email: "userEmail@gmail.com",
        phone: "123456789",
        avatar: "pic.jpg",
        location: "userLocation",
        role: 1,
        assignedServiceCenter: 1,
      });
      var user = await superAdmin.save();
      //  create token
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      var token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000,
      });
      //create service center
      const serviceCenter1 = new serviceCenter({
        admin: user.id,
        name: "service center 1",
        serviceLocation: "KATHMANDU",
        bookingLimit: 5,
        bookingCount: 0,
      });
      await serviceCenter1.save();
      const res = await request(app)
        .get("/service-center/admin")
        .set("x-auth-token", token);

      expect(res.body).to.be.an("object");
      expect(res.status).to.equal(200);
    });

    it("delete the sercice center", async () => {
      id = 1;
      const res = await request(app).delete("/service-center/" + id);

      expect(res.body).to.be.an("object");
      expect(res.status).to.equal(401); //401 because id is incorrect
    });

    //Update
    it("UPDATE SERVICE CENTERS", async () => {
      //login and register super admin
      const superAdmin = new users({
        username: "pabinasda",
        password: "12345jklm",
        name: "user1name",
        email: "userEmail@gmail.com",
        phone: "123456789",
        avatar: "pic.jpg",
        location: "userLocation",
        role: 1,
        assignedServiceCenter: 1,
      });
      var user = await superAdmin.save();

      //create and save service center
      const serviceCenter1 = new serviceCenter({
        admin: user.id,
        name: "service center 1",
        serviceLocation: "KATHMANDU",
        bookingLimit: 5,
        bookingCount: 0,
        contact: 123123123,
      });
      await serviceCenter1.save();
      // new service centeer info to be updated
      const serviceCenter2 = {
        admin: user.id,
        name: "service center 2",
        serviceLocation: "JHAPA",
        bookingLimit: 5,
        bookingCount: 0,
        contact: 123123123,
      };

      //  create token
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      var token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000,
      });
      //update service center
      const res = await request(app)
        .post("/service-center/update")
        .set("x-auth-token", token)
        .send(serviceCenter2);
      expect(res.status).to.equal(200);
    });
  });
});
