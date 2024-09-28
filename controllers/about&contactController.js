const {About,Contact} =  require("../models/about&contactModel")


const addnewAbout = async (req, res) => {
    const { caption } = req.body;
  
    if (!caption) {
      return res.status(400).json({ error: 'caption is required' });
    }
  
   
    try {
      const newAbout = new About({
        caption,
        
      });
  
      await newAbout.save();
      res.status(201).json(newAbout);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAllAbout = async (req, res) => {
    try {
      const categories = await About.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const updateAbout = async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;
  
    if (!caption === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    try {
      const brand = await About.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'About not found' });
      }
  
      if (caption) {
        brand.caption = caption;
      }
  
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteAbout = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await About.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ error: 'About not found' });
      }
  
      res.status(200).json({ message: 'About deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAboutById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await About.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //-------------------------------Contact---------------------------------
  const addnewContact = async (req, res) => {
    const { caption } = req.body;
  
    if (!caption) {
      return res.status(400).json({ error: 'caption is required' });
    }
  
   
    try {
      const newContact = new Contact({
        caption,
        
      });
  
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAllContact = async (req, res) => {
    try {
      const categories = await Contact.find();
      res.status(201).json(categories);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  const updateContact = async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;
  
    if (!caption === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }
  
    try {
      const brand = await Contact.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'Contact not found' });
      }
  
      if (caption) {
        brand.caption = caption;
      }
  
  
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteContact = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Contact.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ error: 'Contact not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getContactById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const brand = await Contact.findById(id);
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
    addnewAbout,
    getAllAbout,
    updateAbout,
    deleteAbout,
    getAboutById,
    addnewContact,
    getAllContact,
    updateContact,
    deleteContact,
    getContactById
}