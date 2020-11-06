const express = require('express');
const companyController = require('../controllers/company.controller');
const jobController = require('../controllers/job.controller');
const router = express.Router()

// company routes start here
router.post('/create-company', companyController.createCompany);

router.get('/company/:companySlug', companyController.getCompany);

router.put('/company/:companySlug/edit', companyController.updateCompany);

router.delete('/company/:companySlug/delete', companyController.deleteCompany);
// company routes end here

// job routes start here
router.post('/create-job', jobController.createJob);
router.get('/job/:jobSlug', jobController.getJob);
router.put('/job/:jobSlug/edit', jobController.updateJob);
router.delete('/job/:jobSlug', jobController.deleteJob);
// job routes end here

module.exports =router;