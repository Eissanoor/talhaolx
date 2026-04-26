const express = require("express");
const router = express.Router();
const footerContentController = require("../controllers/footerContentController");

router.get("/",  footerContentController.getAllFooterContents);
router.get("/:id",  footerContentController.getFooterContentById);
router.post("/", footerContentController.addNewFooterContent);
router.put("/:id", footerContentController.updateFooterContent);
router.delete("/:id", footerContentController.deleteFooterContent);

module.exports = router;
