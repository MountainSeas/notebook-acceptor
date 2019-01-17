const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
const APIError = require('../helpers/APIError')

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{10}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
// 钩子函数，指定save() 之前的操作
UserSchema.pre('save', function (next) {
  const user = this
  // 缓慢参数
  const SALT_FACTOR = 10
  // 随机生成盐
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

/**
 * Methods
 */
UserSchema.method({
  // 比较密码
  comparePassword (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objected of user
   * @returns {Promise<User, APIError>}
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user
        }
        const err = new APIError('No such user exits!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },

  /**
   * List users in descending order of 'createAt' timestamp.
   * @param {number} skip -Number of users to be skipped.
   * @param {number} limit -Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  }
}

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema)
