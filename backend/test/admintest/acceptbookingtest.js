
// const request = require("supertest");
// const expect = require("chai").expect;
// const booking = require("../../models/Booking.model");
// const users = require("../../models/UserDetails.model");
// const bike = require("../../models/Bike.model");
// const bikeModel = require("../../models/Bike.model");
// const serviceCenter = require("../../models/ServiceCenter.model");
// const app = require("../../server");
// const Mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// describe(" ACCEPT BOOKING", () => {
//     beforeEach(function(done) {
//         // this.timeout(9000);
//         users.deleteMany({}, () => {
//             serviceCenter.deleteMany({}, () => {
//                 bikeModel.deleteMany({}, () => {
//                     bike.deleteMany({}, () => {
//                         booking.deleteMany({}, () => {
//                             done();
//                         })
//                     })
//                 })
//             })


//         })

//     });
// it("ACCEPT BOOKING", async() => {

//     //SUPERADMIN DETAIL
//     const superAdmin = new users({
//         username: "superadmin1",
//         password: "asdasd123",
//         name: "superadminUser1",
//         email: "superdmin@gmail.com",
//         phone: "12345678",
//         avatar: "pic.jpg",
//         location: "userLocation",
//         role: 1,
//         assignedServiceCenter: 0
//     });
//     var superAdminRes = await superAdmin.save();
//     // console.log(superAdmin)
//     //ADMIN DETAIL
//     const adminUser = new users({
//         username: "adminUser1",
//         password: "12312311asd",
//         name: "adminUser1",
//         email: "admin@gmail.com",
//         phone: "123123123",
//         avatar: "pic.jpg",
//         location: "pokhara",
//         role: 2,
//         assignedServiceCenter: 0
//     });
//     var adminUserRes = await adminUser.save();
//     //  console.log(adminUserRes)
//     //boke model detail
//     const bikeModels = new bikeModel({
//         bikeModel: "vespa123",
//         totalUsers: "13"
//     });
//     const bikemodelresult = await bikeModels.save();
//     // console.log(bikemodelresult);
//     //bike detail
//     var bikes = new bike({
//         user: adminUser._id,
//         bikeModel: bikemodelresult._id,
//         bikeNumber: 1234,
//         odometer: 1500
//     })
//     const bikeResult = await bikes.save();
//     // console.log(bikeResult);


//     //service center detail
//     const serviceCenters = new serviceCenter({
//         admin: adminUser._id,
//         name: "My service center",
//         serviceLocation: "kathmandu",
//         bookingLimit: 20,
//         bookingCount: 0,
//         contact: 123123123
//     });

//     const serciveCenterResult = await serviceCenters.save();
//     //  console.log(serciveCenterResult);

//     //USEr DETAIL
//     const normalUser = new users({
//         username: "normalUser",
//         password: "normalUser123",
//         name: "normalUser1",
//         email: "normalUser@gmail.com",
//         phone: "131231243",
//         avatar: "pic.jpg",
//         location: "KATHMANDU",
//         role: 3,
//         assignedServiceCenter: 1
//     });
//     //create user token
//     var normalUserResult = await normalUser.save();
//     //create token 
//     const payload = {
//         user: {
//             id: normalUserResult.id,
//             role: normalUserResult.role
//         }
//     };
//     var token = jwt.sign(
//         payload,
//         config.get("jwtSecret"), { expiresIn: 36000 }
//     );
//     //create admin token
//     const payloadAdmin = {
//         user: {
//             id: adminUserRes.id,
//             role: adminUserRes.role
//         }
//     };
//     var tokenAdmin = jwt.sign(
//         payloadAdmin,
//         config.get("jwtSecret"), { expiresIn: 36000 }
//     );

//     //booking detail
//     const bookings = {
//         bikeDetails: bikeResult._id,
//         serviceCenter: serciveCenterResult._id
//             // bookingDate: Date.now(),
//             // servicingDate: Date.now(),
//             // lastServicingDate: Date.now(),
//             // bookingStatus: 0,
//             // totalPrice: 123

//     }
//     const reqBookingResult = await request(app).post("/booking/request").send(bookings).set('x-auth-token', token);
//     // expect(reqBookingResult.body).to.be.an("object");
//     // expect(reqBookingResult.status).to.equal(200);
//     //accept booking data
//     const bookingDetail = {
//         acceptedBookings: [{
//             id: bikeResult._id,
//             servicingDate: Date.now()
//         }]
//     }


//     //accept booking
//     const acceptBooking = await request(app).post("/booking/accept").send(bookingDetail).set('x-auth-token', tokenAdmin)
//     console.log(typeof(acceptBooking.body.payload[0].bikeid));
//     console.log(typeof(bikeResult._id));

//     expect(acceptBooking.body.payload[0].bikeid).to.equal(String(bikeResult._id));
//     expect(acceptBooking.status).to.equal(200)




// });









// });