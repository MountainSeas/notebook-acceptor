const express = require('express')
const validate = require('express-validation')
const paramValidate = require('./validation')
const userCtrl = require('./controller')

const router = express.Router()

router.route('/')
  // GET /api/user - Get list of users
  .get(userCtrl.list)

  // POST /api/user -Create new user
  .post(validate(paramValidate), userCtrl.create)

router.route('/:userId')
  // GET /api/user/:userId - Get user
  .get(userCtrl.get)

  // PUT /api/user/:userId - Update user
  .put(validate(paramValidate), userCtrl.update)

  // DELETE /api/user/:userId - Update user
  .delete(userCtrl.remove)

// Load user when API with userId route parameter is hit
router.param('userId', userCtrl.load)

module.exports = router
