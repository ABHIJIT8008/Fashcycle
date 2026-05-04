const SiteContent = require('../models/SiteContent');

const getAllContent = async (req, res) => {
  try {
    const contents = await SiteContent.find();
    
    const siteData = {};
    contents.forEach(item => {
      siteData[item.section] = item.data;
    });

    res.status(200).json({ success: true, data: siteData });
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch site content', error: error.message });
  }
};

const updateSectionContent = async (req, res) => {
  try {
    const { section } = req.params;
    const contentData = req.body;

    const content = await SiteContent.findOneAndUpdate(
      { section },
      { data: contentData },
      { new: true, upsert: true }
    );

    res.status(200).json({ 
      success: true, 
      message: `Section '${section}' updated successfully`, 
      data: content 
    });
  } catch (error) {
    console.error(`Error updating section ${req.params.section}:`, error);
    res.status(500).json({ success: false, message: 'Failed to update section content', error: error.message });
  }
};

module.exports = {
  getAllContent,
  updateSectionContent
};
