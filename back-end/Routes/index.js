const jobRouter = require('./job')

function route(app){
    app.use('/job',jobRouter)


}

module.exports = route;