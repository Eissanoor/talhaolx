const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post("/replay", commentController.addSubcomment)
router.get("/replay/:productId", commentController.getCommentsWithReplies)
router.post('/', commentController.addCommentToProduct)
router.get('/:productId', commentController.getProductWithComments)
router.delete('/:commentId', commentController.deleteComment)
module.exports = router;