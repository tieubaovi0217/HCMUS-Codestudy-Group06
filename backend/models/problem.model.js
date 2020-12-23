const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const problemSchema = new Schema({
    problem_id:
    {
        type: String,
        unique: true,
        maxlength: 5,
        minlength: 5,
        trim: true,
    },
    problem_name:
    {
        type: String,
        unique: true,
        maxlength: 20,
        trim: true,
    },
    problem_difficulty:
    {
        type: Number,
    },
    num_solved:
    {
        type:Number,
    },
    
    time_limit:
    {
        type: Number,
        default: 1
    },
    mem_limit:
    {
        type: Number,
        default: 1024
    },

    description:
    {
        type: String,
        require:true
    },

    input_format:
    {
        type: String,
        require:true
    },

    output_format:
    {
        type: String,
        require:true
    },
    inputs:
    {
        type : [String],
        require: true
    },
    outputs:
    {
        type : [String],
        require: true
    }
}
);

const Problem = mongoose.model('Problem',problemSchema);
module.exports = Problem;
