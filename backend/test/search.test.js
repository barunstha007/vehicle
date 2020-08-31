// const request = require("supertest");
// const expect = require("chai").expect;
// const searchdetails = require("../models/Searchpacakges.model");
// const app = require("../server");
// const Mongoose = require("mongoose");

// describe("Package search : GET/", () => {
//     describe("RETRIEVE PACKAGES DETAILS", () => {
//         beforeEach(function(done) {
//             this.timeout(9000);
//             searchdetails.deleteMany({}, (err) => {
//               if (err) return done(err);
                
//                 done();

//             })
//         });

//         it("When packages is selected it shouldd show packages details", async() => {
//             packageSearch={
//                 packages:"50hours",
//             }
//             const res = await request(app)
//             .post("/getPackages/")
//             .send(packageSearch);
//             expect(res.status).to.equal(200);
//         })


//     })
// })