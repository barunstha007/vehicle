const request = require("supertest");
const expect = require("chai").expect;
const booking = require("../../models/Booking.model");
const users = require("../../models/UserDetails.model");
const bike = require("../../models/Bike.model");
const bikeModel = require("../../models/Bike.model");
const serviceCenter = require("../../models/ServiceCenter.model");
const app = require("../../server");
const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("CAMCEL BOOKING  : POST/", () => {
        describe("CANCEL BOOKING", () => {
            beforeEach(function(done) {
                this.timeout(9000);
                booking.deleteMany({}, (err) => {
                  if (err) return done(err);
                    
                    done();
    
                })
            });
    
    it("delete the  bike booking request ", async() => {
            
        id=1
        const res = await request(app).delete("/cancelrequest /users"+id);

        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(200);



    });
    
});
});