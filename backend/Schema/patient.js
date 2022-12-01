const patientSchema = {
  healthID: String,
  firstName: String,
  lastName: String,
  medicalHistory: Object,
  DOB: Date,
  address: String,
  gender: String,
  aadharNumber: BigInt64Array,
  email: String,
  password: String,
};

export default patientSchema;
