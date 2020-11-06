const mongoose = require("mongoose");
const slug = require("slug");

const Schema = mongoose.Schema;
const JobSchema = new Schema({
  role: { 
    type: 'String',
    enum: ["Frontend", "Backend", "Full Stack", "Intern"],
    default: "Frontend",
    required: true
  },
  level: {
    type: 'String',
    enum: ["Fresher", "Junior", "Midweight", "Senior"],
    default: "Fresher",
    required: true
  },
  contract: {
    type: 'String',
    enum: ["FullTime", "PartTime", "Contract"],
    default: "FullTime",
    required: true
  },
  jobOverview: { type: String, required: true },
  language: [
    { name: { type: String, required: true } }
  ],
  tools: [
    { name: { type: String, required: true } }
  ],
  featured: { type: Boolean, default: false, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  title: { type: String, required: true },
  slug: { type: String, unique: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

JobSchema.pre('save', function (next) {
  this.slug = slug(this.title, {
    lower: true
  });
  next();
})

module.exports = mongoose.model('Job', JobSchema);