const request = require("supertest");
const expect = require("chai").expect;
const bikedetails = require("../models/Bike.model");
const app = require("../server");
const Mongoose = require("mongoose");
const config = require("config");

const jwt = require("jsonwebtoken");

describe(" ADD BIKE DETAILS : POST/", () => {
  describe("ADD BIKE DETAILS", () => {
    beforeEach(function (done) {
      this.timeout(9000);
      bikedetails.deleteMany({}, (err) => {
        if (err) return done(err);

        done();
      });
    });

    it("When bikemodel is empty it should return :400 ", async () => {
      const bikedetails = {
        bikemodel: "",
        bikenumber: "123",
        odometer: "12",
        bikestatus: "good",

        role: 1,
        assignedServiceCenter: 1,
      };

      // await user.save();

      const res = await request(app).post("/bikedetails/").send(bikedetails);
      expect(res.status).to.equal(400);
      expect(res.body.error[0].msg).to.equal("Please select your bike model");
    });

    it("When odometer is empty it should return :400 ", async () => {
      const bikedetails = {
        bikemodel: "",
        bikenumber: "123",
        odometer: "12",
        bikestatus: "good",

        role: 1,
        assignedServiceCenter: 1,
      };

      // await user.save();

      const res = await request(app).post("/bikedetails/").send(bikedetails);
      expect(res.status).to.equal(400);
      expect(res.body.error[0].msg).to.equal("Please enter your odometer");
    });
  });

  it("When bikestatus is empty it should return :400 ", async () => {
    const bikedetails = {
      bikemodel: "",
      bikenumber: "123",
      odometer: "12",
      bikestatus: "good",

      role: 1,
      assignedServiceCenter: 1,
    };

    // await user.save();

    const res = await request(app).post("/bikedetails/").send(bikedetails);
    expect(res.status).to.equal(400);
    expect(res.body.error[0].msg).to.equal("Please enter your bikestaus");
  });

  it("When bikenumber is empty it should return :400 ", async () => {
    const bikedetails = {
      bikemodel: "",
      bikenumber: "123",
      odometer: "12",
      bikestatus: "good",

      role: 1,
      assignedServiceCenter: 1,
    };

    // await user.save();

    const res = await request(app).post("/bikedetails/").send(bikedetails);
    expect(res.status).to.equal(400);
    expect(res.body.error[0].msg).to.equal("Please enter your bikenumber");
  });

  it("When bikenumber is Repeadted it should return status:400 with error message", async () => {
    const user = {
      bikemodel: "",
      bikenumber: "123",
      odometer: "12",
      bikestatus: "good",

      role: 1,
      assignedServiceCenter: 1,
    };

    // await user.save();

    const res = await request(app).post("/bikedetails/").send(user);
    expect(res.status).to.equal(400);
    expect(res.body.error[0].msg).to.equal("This bike number aleready exists");
  });
});

describe("SAVE BIKE DETAILS TO DATABASE", () => {
  beforeEach(function (done) {
    this.timeout(9000);
    bikedetails.deleteMany({}, (err) => {
      if (err) return done(err);

      done();
    });
  });
  it("When bikedetails is saved to database it should return user object with valid mongo id ", async () => {
    const bikedetails = {
      id: "",
      bikemodel: "pabinasda",
      odometer: "12345jklm",
      bikenumber: "user1name",
      bikestatus: "userEmail@gmail.com",

      role: 1,
      assignedServiceCenter: 1,
    };

    const res = await request(app).post("/bikedetails/").send(bikedetails);
    expect(res.body).to.be.an("object");
    expect(Mongoose.Types.ObjectId.isValid(res.body._id)).to.equal(true);
  });

  //make booking

  it("FETCH BIKEDEATILS FROM DATABASE", async () => {
    const user1 = new bikedetails({
      user: "5f308baba9e04132b8fbc7dd",
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

  describe(" ADD BOOKING : POST/", () => {
    describe("ADD BOOKING", () => {
      beforeEach(function (done) {
        this.timeout(9000);
        bikedetails.deleteMany({}, (err) => {
          if (err) return done(err);

          done();
        });
      });

      it("When servicecenter is empty it should return :400 ", async () => {
        const bikedetails = {
          bikemodel: "",
          bikenumber: "123",
          odometer: "12",
          bikestatus: "good",
          servicecenter: "",

          role: 1,
          assignedServiceCenter: 1,
        };
        const res = await request(app).post("/bikedetails/").send(bikedetails);
        expect(res.status).to.equal(400);
      });

      describe("SAVE BIKE BOOKING TO DATABASE", () => {
        beforeEach(function (done) {
          this.timeout(9000);
          bikedetails.deleteMany({}, (err) => {
            if (err) return done(err);

            done();
          });
        });
        it("When bikebooking is saved to database it should return user object with valid mongo id ", async () => {
          const bikedetails = {
            id: "",
            bikemodel: "pabinasda",
            odometer: "12345jklm",
            bikenumber: "user1name",
            bikestatus: "userEmail@gmail.com",
            servicecenter: "",
            role: 1,
            assignedServiceCenter: 1,
          };

          const res = await request(app)
            .post("/bikedetails/")
            .send(bikedetails);
          expect(res.body).to.be.an("object");
          expect(Mongoose.Types.ObjectId.isValid(res.body._id)).to.equal(true);
        });
      });
    });
  });
});
