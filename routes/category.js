const express = require('express')
const passport = require('passport')
const controller = require('../controllers/category')
const router = express.Router()
const upload = require('../middleware/upload')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)

module.exports = router