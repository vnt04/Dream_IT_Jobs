const Job = require('../Models/Job')


class JobController {
    
    index(req,res){
        res.send('jobs API')
    }
    
    read(req, res, next){
        Job.find({})
        .then(job => res.json(job))
        .then(error => next(error))
    }

}


module.exports = new JobController();