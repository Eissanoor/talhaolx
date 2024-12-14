const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;
const commentController = require('../controllers/commentController');

router.post("/replay", commentController.addSubcomment)
router.get("/replay/:productId",cache('5 minutes'), commentController.getCommentsWithReplies)
router.post('/', commentController.addCommentToProduct)
router.get('/:productId',cache('5 minutes'), commentController.getProductWithComments)
router.delete('/:commentId', commentController.deleteComment)
module.exports = router;