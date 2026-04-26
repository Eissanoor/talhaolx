const FooterContent = require("../models/footerContentModel");

const getAllFooterContents = async (req, res) => {
  try {
    const footerContents = await FooterContent.find().sort({ createdAt: -1 });
    res.status(200).json(footerContents);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const addNewFooterContent = async (req, res) => {
  try {
    const { heading, description } = req.body;
    if (!heading || !description) {
      return res.status(400).json({
        message: "heading and description are required",
      });
    }

    const footerContent = new FooterContent({
      heading,
      description,
    });

    const addedFooterContent = await footerContent.save();
    res.status(201).json(addedFooterContent);
  } catch (error) {
    console.log("Error creating FooterContent:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getFooterContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const footerContent = await FooterContent.findById(id);

    if (!footerContent) {
      return res.status(404).json({ message: "FooterContent not found" });
    }

    res.status(200).json(footerContent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateFooterContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    const footerContent = await FooterContent.findById(id);
    if (!footerContent) {
      return res.status(404).json({ message: "FooterContent not found" });
    }

    if (heading !== undefined) footerContent.heading = heading;
    if (description !== undefined) footerContent.description = description;

    const updatedFooterContent = await footerContent.save();
    res.status(200).json(updatedFooterContent);
  } catch (error) {
    console.error("Error updating FooterContent:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteFooterContent = async (req, res) => {
  try {
    const { id } = req.params;

    const footerContent = await FooterContent.findById(id);
    if (!footerContent) {
      return res.status(404).json({ message: "FooterContent not found" });
    }

    await FooterContent.findByIdAndDelete(id);
    res.status(200).json({ message: "FooterContent deleted successfully" });
  } catch (error) {
    console.error("Error deleting FooterContent:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFooterContents,
  addNewFooterContent,
  getFooterContentById,
  updateFooterContent,
  deleteFooterContent,
};
