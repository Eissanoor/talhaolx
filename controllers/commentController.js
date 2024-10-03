const Comment =  require("../models/commentModel")

const Product = require("../models/productModel")

// const addCommentToProduct = async (req, res) => {
//     try {
//         const { userId,productId, commentText, rating } = req.body;
//          // assuming user is authenticated and their id is in req.user
        
//         // Create a new comment
//         const newComment = new Comment({
//             userId,
//             productId,
//             commentText,
//             rating
//         });

//         await newComment.save();

//         // Update the product with the new comment
//         await Product.findByIdAndUpdate(productId, {
//             $push: { comments: newComment._id }
//         });

//         res.status(201).json({ message: 'Comment added successfully', comment: newComment });
//     } catch (error) {
//         console.log(error);
        
//         res.status(500).json({ error: 'Failed to add comment' });
//     }
// };
// const addSubcomment = async (req, res) => {
//     try {
//         const { userId, commentId, commentText, rating } = req.body;

//         // Ensure that the parent comment exists
//         const parentComment = await Comment.findById(commentId);
//         if (!parentComment) {
//             return res.status(404).json({ error: 'Parent comment not found' });
//         }

//         // Create a new subcomment (reply)
//         const newSubcomment = new Comment({
//             userId,
//             productId: null, // Subcomments don't need productId
//             commentText,
//             rating: rating || 5 // Optional rating, default to 5 if not provided
//         });

//         await newSubcomment.save();

//         // Update the parent comment with the new subcomment
//         parentComment.replies.push(newSubcomment._id);
//         await parentComment.save(); // Save after updating replies

//         res.status(201).json({ message: 'Reply added successfully', reply: newSubcomment });
//     }catch (error) {
//         console.log(error.message);
        
//         res.status(500).json({ error: 'Failed to add reply' });
//     }
// };

const createNewComment = async ({ userId, productId = null, commentText, rating }) => {
    const newComment = new Comment({
        userId,
        productId, // Null for subcomments
        commentText,
        rating: rating || 5 // Optional rating
    });

    await newComment.save();
    return newComment;
};

const addCommentToProduct = async (req, res) => {
    try {
        const { userId, productId, commentText, rating } = req.body;

        // Create a new comment associated with a product
        const newComment = await createNewComment({ userId, productId, commentText, rating });

        // Update the product with the new comment
        await Product.findByIdAndUpdate(productId, {
            $push: { comments: newComment._id }
        });

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};
const addSubcomment = async (req, res) => {
    try {
        const { userId, commentId, commentText, rating } = req.body;

        // Ensure that the parent comment exists
        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }

        // Create a subcomment (reply)
        const newSubcomment = await createNewComment({ userId, commentText, rating });

        // Add the subcomment's ID to the parent comment's replies
        parentComment.replies.push(newSubcomment._id);
        await parentComment.save();

        res.status(201).json({ message: 'Reply added successfully', reply: newSubcomment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add reply' });
    }
};


const getProductWithComments = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Find all comments for the specific productId
        const comments = await Comment.find({ productId }).populate('userId', 'username image') // Populate user details (e.g., username)
            

        res.status(200).json(comments);
    }catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Failed to retrieve product with comments' });
    }
};

const getCommentsWithReplies = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find all top-level comments related to the product
        const comments = await Comment.find({ productId })
            .populate('userId', 'username') // Populate user details for the comment
            .populate({
                path: 'replies',
                populate: {
                    path: 'userId',
                    select: 'username' // Populate user details for each reply
                }
            });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this product' });
        }

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve comments with replies' });
    }
};
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        // Find the comment by ID
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Option 1: Delete the comment and its replies (if any)
        await Comment.deleteMany({ _id: { $in: comment.replies } }); // Delete all replies
        await Comment.findByIdAndDelete(commentId); // Delete the main comment

        res.status(200).json({ message: 'Comment and its replies deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};
module.exports = {
    addCommentToProduct,
    getProductWithComments,
    addSubcomment,
    getCommentsWithReplies,
    deleteComment
}