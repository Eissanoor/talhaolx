const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;
const aboutController = require('../controllers/about&contactController');
//-------------contact------------------------------
router.get('/contact',cache('5 minutes'), aboutController.getAllContact)
router.post('/contact', aboutController.addnewContact)
router.put('/contact/:id', aboutController.updateContact)
router.get('/contact/:id', cache('5 minutes'),aboutController.getContactById)
router.delete('/contact/:id', aboutController.deleteContact)
//-----------------about---------------------------
router.get('/', cache('5 minutes'),aboutController.getAllAbout)
router.post('/', aboutController.addnewAbout)
router.put('/:id', aboutController.updateAbout)
router.get('/:id',cache('5 minutes'), aboutController.getAboutById)
router.delete('/:id', aboutController.deleteAbout)

module.exports = router;