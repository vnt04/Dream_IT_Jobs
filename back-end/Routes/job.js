const express = require('express')
const router = express.Router()

const jobController = require('../Controllers/JobController')

router.get('/read/:jobID',jobController.detail);
router.get('/read',jobController.read)
router.get('/',jobController.index)



module.exports = router;