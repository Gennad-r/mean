const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()

// http://localhost:5000/api/auth/analytics
router.get('/analytics', controller.analytics)

// http://localhost:5000/api/auth/overview
router.get('/overview', controller.overview)

module.exports = router