const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

mongoose.set('useCreateIndex', true);
mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB is connected!'))
    .catch(e => console.log('DB connection failed'))
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(require('morgan')('combined'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
