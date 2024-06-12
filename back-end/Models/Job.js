const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
    {
        job_title:{
            type: String,
            require: true
        },
        company:{
            type: String,
            require: true,
        },
        salary_range:{
            type: Object,
            require: true,
            properties:{
                min_salary:{
                    type: Number,
                    require:true,
                },
                max_salary:{
                    type: Number,
                    require:true,
                }
            }
        },
        tag:{
            type: [String],
            require:true
        },
        address:{
            type:String,
            require:true,
        },
        img:{
            type: String,
            require: true,
            default:'./src/assets/jobs-img/job-df'
        },
        time_created:{
            type:Date,
            require:true
        },
        type_job:{
            type:String,
        },
        contract:{
            type:String
        }

    }
)


module.exports = mongoose.model('Job',JobSchema);