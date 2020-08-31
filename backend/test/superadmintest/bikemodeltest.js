const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../server");
const bikemodel = require("../../models/BikeModel.model");

const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//npm run test -- --grep userprofile
const config = require("config");

describe("ADD BIKE MODEL : POST/", () => {
  describe("BIKE MODEL ", () => {
    beforeEach(function (done) {
      this.timeout(9000);
      bikemodel.deleteMany({}, (err) => {
        if (err) return done(err);

        done();
      });
    });

    it("When  model is empty it should return status:400", async () => {
      const bikemodel = {
        bikeModel: "",
      };

      const res = await request(app).post("/superadmin/").send(bikemodel);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.lengthOf.greaterThan(0);
    });

    it("delete the bike model", async () => {
      id = 1;
      const res = await request(app).delete("/bike-model/admin" + id);

      expect(res.body).to.be.an("object");
      expect(res.status).to.equal(200);
    });
  });
});
