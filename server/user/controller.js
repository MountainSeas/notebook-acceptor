const User = require('./model')
const resFormat = require('../helpers/resFormat')

/**
 * Load user and append to req
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} id
 */
function load (req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get user
 * @param {*} req
 * @param {*} res
 */
function get (req, res) {
  return res.json(resFormat({
    data: req.user,
    status: '000'
  }))
}

/**
 * Create new user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function create (req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mobileNumber: req.body.mobileNumber
  })
  user.save()
    .then(saveUser => res.json(resFormat({
      data: saveUser,
      status: '000'
    })))
    .catch(e => next(e))
}

/**
 * Update existing user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function update (req, res, next) {
  const user = req.user
  user.username = req.body.username
  user.mobileNumber = req.body.mobileNumber

  user.save()
    .then(saveUser => res.json(resFormat({
      data: saveUser,
      status: '000'
    })))
    .catch(e => next(e))
}

/**
 * Get user list
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function list (req, res, next) {
  const { limit = 50, skip = 0 } = req.query
  User.list({ limit, skip })
    .then(users => res.json(resFormat({
      data: users,
      status: '000'
    })))
    .catch(e => next(e))
}

function remove (req, res, next) {
  const user = req.user
  user.remove()
    .then(deleteUser => res.json(resFormat({
      data: deleteUser,
      status: '000'
    })))
    .catch(e => next(e))
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove
}
