const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
      
    },
    commentText: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        default: 5 
    },
    replies: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment' 
    }], // Array of subcomments
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
