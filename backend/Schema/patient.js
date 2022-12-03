// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const patientSchema = new Schema({
//   healthID: String,
//   address: String,
//   age: Number,
//   gender: String,
//   medicalHistory: [
//     {
//       dateVisited: Date,
//       doctorName: String,
//       hospitalName: String,
//       hospitalAddress: String,
//       disease: String,
//       symptoms: String,
//       medicines: String,
//       medicineFees: Number,
//       HospitalFees: Number,
//       prescriptionNote: String,
//     },
//   ],
//   password: String,
//   email: String,
//   firstName: String,
//   lastName: String,
//   city: String,
//   state: String,
//   pincode: String,
//   DOB: Date,
//   phoneNo: String,
// });

// export default patientSchema;

// const userData = [
//   {
//   "_id": "63787533ba35e69e7123ce07",
//   "healthID": "ADNMH2101",
//   "address": "Deshmukh Palace, Mankapur, Nagpur",
//   "age": 20,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Asthma",
//   "symptoms": "Difficulty in breathing , Fever , Cough",
//   "medicines": "Honitus , Air Purifer",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a healthy Diet"
//   },
//   {
//   "dateVisited": "2021-10-17T00:00:00.000Z",
//   "doctorName": "Mr. Godse",
//   "hospitalName": "Godse Hospital",
//   "hospitalAddress": "Godse Hospital, Godhni Road, Nagpur",
//   "disease": "Common Cold",
//   "symptoms": "Fever , Cough",
//   "medicines": "Honitus , Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a healthy Diet"
//   }
//   ],
//   "password": "123456",
//   "email": "abhi@gmail.com",
//   "firstName": "Abhinav",
//   "lastName": "Deshmukh",
//   "city": "Nagpur",
//   "state": "Maharashtra",
//   "pincode": "440030",
//   "DOB": "2001-10-21T18:30:00.000Z",
//   "phoneNo": "8895678423"
//   },
//   {
//   "_id": "6378b0e2b506f8a266561495",
//   "healthID": "ULAM3003",
//   "address": "Balaji Apartment, Near Shegaon Naka, Amravati",
//   "age": 20,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Mangle",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Mangle Hospital, Near Shegaon Naka, Amravati",
//   "disease": "Dengue",
//   "symptoms": "Fever, Cough",
//   "medicines": "Ecalapytpus leaves juice ,Synarist",
//   "medicineFees": 100,
//   "HospitalFees": 400,
//   "prescriptionNote": "Take a Healthy diet, sleep more than 8 hrs"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Common Cold",
//   "symptoms": "Runny Nose , Fever ,Cough",
//   "medicines": "Honitus , Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a Healthy diet, sleep more than 8 hrs"
//   }
//   ],
//   "password": "123456",
//   "email": "utk@gmail.com",
//   "firstName": "Utkarsh",
//   "lastName": "Landge",
//   "city": "Amravati",
//   "state": "Maharashtra",
//   "pincode": "444607",
//   "DOB": "2001-03-30T18:30:00.000Z",
//   "phoneNo": "8657385137"
//   },
//   {
//   "_id": "6378d56c571f1f8ad0d51c3f",
//   "healthID": "YTNMH2903",
//   "address": "Yash HOUSE, Near ozar Naka, Nashik",
//   "age": 21,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Mangle",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Mangle Hospital, Near Shegaon Naka, Nagpur",
//   "disease": "COVID +VE",
//   "symptoms": "Fever , Cough",
//   "medicines": "Honitus ,Synarist",
//   "medicineFees": 100,
//   "HospitalFees": 200,
//   "prescriptionNote": " Stay cool, eat veg"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Malaria",
//   "symptoms": "Stomache,High Fever , Cough",
//   "medicines": "Frycud , Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a Healthy diet, sleep more than 8 hrs, eat salad"
//   }
//   ],
//   "password": "123456",
//   "email": "yash@gmail.com",
//   "firstName": "Yash ",
//   "lastName": "Tayade",
//   "city": "Nashik",
//   "state": "Maharashtra",
//   "pincode": "4110022",
//   "DOB": "2001-03-29T18:30:00.000Z",
//   "phoneNo": "8659885237"
//   },
//   {
//   "_id": "6378d6b7571f1f8ad0d51c40",
//   "healthID": "ADAMH1404",
//   "address": "Mayank Appartment, Near D Mart, Amravati",
//   "age": 24,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Mangle",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Mangle Hospital, Near Shegaon Naka, Amravati",
//   "disease": "Anxiety issues",
//   "symptoms": "High Stress , High Fatigue",
//   "medicines": "Eractius 100 mcg ,Syarst",
//   "medicineFees": 100,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a Healthy diet, Avoid Meat"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Common Cold",
//   "symptoms": "Runny Nose ,Fever,Cough",
//   "medicines": "Honitus ,Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a Healthy diet, Avoid Meat"
//   }
//   ],
//   "password": "123456",
//   "email": "ameyd@gmail.com",
//   "firstName": "Amey",
//   "lastName": "Dhole",
//   "city": "Amravati",
//   "state": "Maharashtra",
//   "pincode": "4444605",
//   "DOB": "2001-04-14T18:30:00.000Z",
//   "phoneNo": "8965885237"
//   },
//   {
//   "_id": "6378d728571f1f8ad0d51c41",
//   "healthID": "NDAMH1408",
//   "address": "Mayank Appartment, Near D Mart, Amravati",
//   "age": 21,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Mangle",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Mangle Hospital, Near Shegaon Naka, Amravati",
//   "disease": "Common Cold",
//   "symptoms": "Fever, High Fatigue",
//   "medicines": "Honitus ,Synarist",
//   "medicineFees": 100,
//   "HospitalFees": 200,
//   "prescriptionNote": " Take a deep sleep"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Common Cold",
//   "symptoms": "Runny Nose ,Fever,Cough",
//   "medicines": "Honitus, Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Eat Good, stay safe"
//   }
//   ],
//   "password": "123456",
//   "email": "nakul@gmail.com",
//   "firstName": "Nakul",
//   "lastName": "Deshmukh",
//   "city": "Amravati",
//   "state": "Maharashtra",
//   "pincode": "4444606",
//   "DOB": "2001-05-10T18:30:00.000Z",
//   "phoneNo": "8884285237"
//   },
//   {
//   "_id": "6378d876571f1f8ad0d51c42",
//   "healthID": "SZAMH2506",
//   "address": "Dwarka Appartment, Near  SD Mart, Akola",
//   "age": 21,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Mangle",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Mangle Hospital, Near Shegaon Naka, Akola",
//   "disease": "Common Cold",
//   "symptoms": "Dry Cough , High Fatigue",
//   "medicines": "Honitus, Synarist",
//   "medicineFees": 100,
//   "HospitalFees": 200,
//   "prescriptionNote": "Stay Calm , eat veg"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Common Cold",
//   "symptoms": "Runny Nose, Fever,Cough",
//   "medicines": "Honitus ,Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Eat Non Veg"
//   }
//   ],
//   "password": "123456",
//   "email": "shardul@gmail.com",
//   "firstName": "Shardul",
//   "lastName": "Zende",
//   "city": "Akola",
//   "state": "Maharashtra",
//   "pincode": "466982",
//   "DOB": "2001-06-25T18:30:00.000Z",
//   "phoneNo": "8671985237"
//   },
//   {
//   "_id": "6378d9f5571f1f8ad0d51c43",
//   "healthID": "ASMMH1609",
//   "address": "Shri Appartment, Near Katraj Nagar, Malkapur",
//   "age": 21,
//   "gender": "Female",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-19T18:30:00.000Z",
//   "doctorName": "Prapti Maheshwari",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Jobin Villas, Hinjewadi Ratlam , Nagpur",
//   "disease": "Cancer",
//   "symptoms": "Dry BP , High Fatigue",
//   "medicines": "Honitus, Synarist",
//   "medicineFees": 100,
//   "HospitalFees": 200,
//   "prescriptionNote": "Have a good diet"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "CANCER",
//   "symptoms": "high BP , Cough",
//   "medicines": "Honitus , Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Have a Vegan Diet"
//   }
//   ],
//   "password": "123456",
//   "email": "Aviral@gmail.com",
//   "firstName": "Aviral",
//   "lastName": "Shrivastava",
//   "city": "Malkapur",
//   "state": "Maharashtra",
//   "pincode": "497601",
//   "DOB": "2001-09-16T18:30:00.000Z",
//   "phoneNo": "7671947237"
//   },
//   {
//   "_id": "6378dcf1571f1f8ad0d51c44",
//   "healthID": "ASNMH1906",
//   "address": "Sable Appartment, Near Sable Nagar, Nanded",
//   "age": 21,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-01-09T18:30:00.000Z",
//   "doctorName": "Mr. Mangle",
//   "hospitalName": "Mangle Hospital",
//   "hospitalAddress": "Mangle Hospital, Near Shegaon Naka, Amravati",
//   "disease": "Orthopedic issues",
//   "symptoms": "Bone impartment , High Fatigue",
//   "medicines": "Honitus  ,Synarist",
//   "medicineFees": 100,
//   "HospitalFees": 200,
//   "prescriptionNote": "Sleep Well"
//   },
//   {
//   "dateVisited": "2021-08-14T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Common Cold",
//   "symptoms": "Runny Nose  , High Cough",
//   "medicines": "Honitus , Synarist",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Sleep Well, Eat Veg"
//   }
//   ],
//   "password": "123456",
//   "email": "atharva@gmail.com",
//   "firstName": "Atharva",
//   "lastName": "Sable",
//   "city": "Nanded",
//   "state": "Maharashtra",
//   "pincode": "444002",
//   "DOB": "2001-06-19T18:30:00.000Z",
//   "phoneNo": "7914947237"
//   },
//   {
//   "_id": "637f789517f3d3b281cfb983",
//   "healthID": "AGSMH0801",
//   "address": "Indrajit Apartment, Behind Tirpude College, Near Bardi, Nagpur",
//   "age": 20,
//   "gender": "male",
//   "medicalHistory": [
//   {
//   "dateVisited": "2021-08-09T18:30:00.000Z",
//   "doctorName": "Mr. Ambale",
//   "hospitalName": "Ambale Hospital",
//   "hospitalAddress": "Ambale Hospital, Godhni Road, Nagpur",
//   "disease": "Asthma",
//   "symptoms": "Difficulty in breathing , Fever , Cough",
//   "medicines": "Honitus , Air Purifer",
//   "medicineFees": 150,
//   "HospitalFees": 200,
//   "prescriptionNote": "Take a healthy Diet"
//   }
//   ],
//   "password": "123456",
//   "email": "abhidesh@gmail.com",
//   "firstName": "Abhisekh",
//   "lastName": "Deshmukh",
//   "city": "Nagpur",
//   "state": "Maharashtra",
//   "pincode": "440030",
//   "DOB": "2001-10-21T18:30:00.000Z",
//   "phoneNo": "8657945237"
//   },
//   {
//   "_id": "63809201037cb639c06db5fe",
//   "healthID": "RG4f1101",
//   "address": "Rohit Palace, Goregaon, Mumbai",
//   "age": "22",
//   "gender": "Male",
//   "medicalHistory": [
//   {
//   "dateVisited": "Fri Nov 25 2022 15:32:01 GMT+0530 (India Standard Time)",
//   "doctorName": "Ashitosh Godse",
//   "hospitalName": "Godse Clinic",
//   "disease": "common cold",
//   "symptoms": "fever",
//   "medicines": "synarist",
//   "medicineFees": "50",
//   "consultationFees": "100",
//   "prescriptionNote": "take bed rest for 3 days"
//   },
//   {
//   "dateVisited": "Fri Nov 25 2022 15:32:01 GMT+0530 (India Standard Time)",
//   "doctorName": "Ashitosh Godse",
//   "hospitalName": "Godse Clinic",
//   "disease": "common cold",
//   "symptoms": "fever",
//   "medicines": "synarist",
//   "medicineFees": "50",
//   "consultationFees": "100",
//   "prescriptionNote": "take bed rest for 3 days"
//   }
//   ],
//   "password": "123456",
//   "email": "rohit@gmail.com",
//   "firstName": "Rohit",
//   "lastName": "Gadhave",
//   "city": "Mumbai",
//   "state": "Maharashtra",
//   "pincode": "445624",
//   "DOB": "2000-07-23T09:56:40.000Z",
//   "phoneNo": "8956478934"
//   }
// ];

// var DocID = "TNDOC3924";
// var emailss = [];

// // console.log(docData);

// userData.map((item) => {
//   var historyy = item.medicalHistory;

//   historyy.map((itemm) => {
//     if(itemm.doctorID === DocID){
//       // emailss.push(item.email);
//       return emailss = [...emailss, item.email];
//     })
//   });
// });

const todayy = new Date();
console.log(todayy, todayy.getFullYear());
