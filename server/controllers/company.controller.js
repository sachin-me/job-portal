const Company = require("../models/Company");

const companyController = {
  createCompany: async (req, res) => {
    const { companyName, address, overview } = req.body;

    if (!companyName || !address || !overview) {
      return res
        .status(400)
        .json({
          error: 'Input fields not set.'
        })
    }

    try {
      const company = await Company.findOne({ companyName: companyName });
      if (company) {
        return res
          .status(400)
          .json({
            error: `This ${companyName} has already been registered.`
          })
      } else {
        const newCompany = new Company({
          companyName,
          address,
          overview
        })
        await newCompany.save((err, doc) => {
          if (err) {
            return res
              .status(409)
              .json({
                error: 'Failed to create company. Please try after sometime.'
              })
          } else {
            return res
              .status(200)
              .json({
                message: `${doc.companyName} has created successfully`,
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
  getCompany: async (req, res) => {
    const { companySlug } = req.params;
    if (!companySlug) {
      return res
        .status(400)
        .json({
          error: `Could not get ${companySlug}.`
        })
    }

    try {
      const company = await Company.findOne({ slug: companySlug });
      if (!company) {
        return res
          .status(404)
          .json({
            error: 'Company not found.'
          })
      } else {
        return res
          .status(200)
          .json({
            message: `${company.companyName} found.`,
            company
          })
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong'
        })
    }
  },
  updateCompany: async (req, res) => {
    const { companySlug } = req.params;
    const { companyName, address, overview } = req.body;

    if (!companySlug) {
      return res
        .status(400)
        .json({
          error: `Could not get ${companySlug}.`
        })
    }

    try {
      const editData = {
        companyName,
        address,
        overview
      }
      const company = await Company.findOneAndUpdate({ slug: companySlug }, {
        $set: editData
      }, { new: true, upsert: true }, function (err, doc) {
        if (err) {
          return res
            .status(409)
            .json({
              error: 'Failed to update company. Please try after sometime.'
            })
        } else {
          return res
            .status(200)
            .json({
              message: `${doc.companyName} has been updated successfully.`,
              doc
            })
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong'
        })
    }
  },
  deleteCompany: async (req, res) => {
    const { companySlug } = req.params;
    if (!companySlug) {
      return res
        .status(400)
        .json({
          error: `Could not get ${companySlug}.`
        })
    }

    try {
      const company = await Company.findOneAndDelete({ slug: companySlug }, function (err, doc) {
        if (err) {
          return res
            .status(409)
            .json({
              error: 'Failed to delete company. Please try after sometime.'
            })
        } else {
          return res
            .status(200)
            .json({
              message: `${doc.companyName} has been deleted sucessfully.`,
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

module.exports = companyController;