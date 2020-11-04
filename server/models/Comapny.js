const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true, maxlength: 30 },
  overview: { type: String, required: true, maxlength: 500 },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
});

module.exports = mongoose.model('Company', CompanySchema);