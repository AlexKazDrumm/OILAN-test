const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRouter')
const authorRouter = require('./authorRouter')


router.use('/book', bookRouter)
router.use('/author', authorRouter)

module.exports = router