const Job = require("../models/Job");

const jobController = {
  createJob: async (req, res) => {
    const { title, role, level, contract, jobOverview, language, tools, featured, companyId } = req.body;
    const changeTitleCase = title.toLowerCase();

    if (!title || !role || !level || !contract || !jobOverview || language.length === 0 || tools.length === 0 || Boolean(featured)) {
      return res
        .status(400)
        .json({
          error: 'Input fields not set.'
        })
    }

    try {
      const job = await Job.findOne({ slug: changeTitleCase });

      if (job) {
        return res
          .status(400)
          .json({
            error: `${job.title} already created.`
          })
      } else {
        const jobObj = {
          role,
          level,
          contract,
          jobOverview,
          language,
          tools,
          featured,
          title,
          company: companyId
        }
        const newJob = new Job(jobObj);
        await newJob.save((err, doc) => {
          if (err) {
            return res
              .status(409)
              .json({
                error: 'Failed to create job. Please try after sometime.'
              })
          } else {
            return res
              .status(200)
              .json({
                message: `${doc.title} has been created successfully.`,
                doc
              })
          }
        })
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong.'
        })
    }
  },
  getJob: async (req, res) => {
    const { jobSlug } = req.params;
    if (!jobSlug) {
      return res
        .status(400)
        .json({
          error: `Could not get ${jobSlug}.`
        })
    } 

    try {
      const job = await Job.findOne({ slug: jobSlug });
      if (!job) {
        return res
          .status(404)
          .json({
            error: 'Job not found.'
          })
      } else {
        return res
          .status(200)
          .json({
            message: `${job.title} found.`,
            job
          })
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong.'
        })
    }
  },
  updateJob: async (req, res) => {
    const { jobSlug } = req.params;
    const { title, role, level, contract, jobOverview, language, tools, featured, companyId } = req.body;

    if (!jobSlug) {
      return res
        .status(400)
        .json({
          error: `Could not get ${jobSlug}.`
        })
    }
    if (!title) {
      return res
        .status(400)
        .json({
          error: 'Job title is required*'
        })
    }

    try {
      const jobObj = {
        role,
        level,
        contract,
        jobOverview,
        language,
        tools,
        featured,
        title,
        company: companyId
      }

      const job = await Job.findOneAndUpdate({ slug: jobSlug }, {
        $set: jobObj
      }, { new: true, upsert: true }, function (err, doc) {
        if (err) {
          return res
            .status(409)
            .json({
              error: 'Failed to update job. Please try after sometime.'
            })
        } else {
          return res
            .status(200)
            .json({
              message: `${doc.title} has been updated successfully`,
              doc
            })
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong.'
        })
    }
  },
  deleteJob: async (req, res) => {
    const { jobSlug } = req.params;
    if (!jobSlug) {
      return res
        .status(400)
        .json({
          error: `Could not get ${jobSlug}.`
        })
    }

    try {
      const job = await Job.findOneAndDelete({ slug: jobSlug }, function (err, doc) {
        if (err) {
          return res
            .status(409)
            .json({
              error: 'Failed to delete job. Please try after sometime.'
            })
        } else {
          return res
            .status(200)
            .json({
              message: `${doc.title} has been deleted successfully.`,
              doc
            })
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong.'
        })
    }
  },
  
}

module.exports = jobController;