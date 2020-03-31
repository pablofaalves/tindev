const  { Schema, model } = require ('mongoose')
const  devSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        requirted: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }],
},
{
    timestamps: true
})

module.exports = model('Developer', devSchema)