const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const submissionSchema = new Schema({
    submission_id:
    {
    type: String,
    unique: true,
    trim: true,
    maxlength: 5,
    minlength: 5,
    },

    user_id:
    {
        type: String,
    },

    problem_id:
    {
        maxlength: 5,
        minlength: 5,
        type: String,
    },

    time_submitted: 
    {
         type: Date,
         default: Date.now 
    },

    // C++,Java,Python
    language:
    {
        type : String,
        enum: ['C++', 'Java','Python'],
        default:"C++"
    },

    verdict:
    {
        type: String,
        enum: ['In queue','Wrong answer','Accepted','Time limit exceeded','Compile error','Runtime error','Running','Memory limit exceeded']
    },
    
    time:
    {
        type: Number,
    },
    memory:
    {
        type: Number,
    },
    code:
    {
        type: String
    }
}
);

const Submission = mongoose.model('Submission',submissionSchema);
module.exports = Submission;


