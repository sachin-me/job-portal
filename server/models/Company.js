const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;
const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true, maxlength: 30 },
  overview: { type: String, required: true, maxlength: 500 },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  slug: { type: String, unique: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

CompanySchema.pre('save', function (next) {
  this.slug = slug(this.companyName, { lower: true });
  next();
})

module.exports = mongoose.model('Company', CompanySchema);