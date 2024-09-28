const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about&contactController');
//-------------contact------------------------------
router.get('/contact', aboutController.getAllContact)
router.post('/contact', aboutController.addnewContact)
router.put('/contact/:id', aboutController.updateContact)
router.get('/contact/:id', aboutController.getContactById)
router.delete('/contact/:id', aboutController.deleteContact)
//-----------------about---------------------------
router.get('/', aboutController.getAllAbout)
router.post('/', aboutController.addnewAbout)
router.put('/:id', aboutController.updateAbout)
router.get('/:id', aboutController.getAboutById)
router.delete('/:id', aboutController.deleteAbout)

module.exports = router;