const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server");
const Mongoose = require("mongoose");

describe("BIKEDETAILSUPDATE", () => {
  describe("GET:/", () => {
    beforeEach(function (done) {
      users.deleteMany({}, (err) => {
        if (err) return done(err);
        done();
      });
    });

    it("FETCH BIKEDEATILS FROM DATABASE", async () => {
      const user1 = new users({
        bikemodel: "",
        bikenumber: "123",
        odometer: "12",
        bikestatus: "good",

        role: 1,
        assignedServiceCenter: 1,
      });
      var user = await user1.save();
      //create token
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      var token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000,
      });
      // console.log(token);
      var res = await request(app)
        .get("/profile/user", user)
        .set("x-auth-token", token);
      //   console.log(res.body);
      expect(res.status).equal(200);
      expect(res.body).to.be.an("object");
    });

    it("Update Bikedeatils  In database", async () => {
      const user1 = new users({
        bikemodel: "",
        bikenumber: "123",
        odometer: "12",
        bikestatus: "good",
        role: 1,
        assignedServiceCenter: 1,
      });
      var user = await user1.save();
      //new user details for update
      const user2 = new users({
        bikemodel: "",
        bikenumber: "123",
        odometer: "12",
        bikestatus: "good",
        role: 1,
        assignedServiceCenter: 1,
      });

      const res = await request(app)
        .post("/profile/update/" + user._id)
        .send(user2);
      // console.log(res.body);
      expect(res.status).equal(200);
      expect(res.body).to.be.an("object");
    });
  });
});
