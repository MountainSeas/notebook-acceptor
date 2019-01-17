const Joi = require('joi')
module.exports = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{10}/).required()
  }
}
