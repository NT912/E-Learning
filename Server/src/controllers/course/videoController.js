const videoService = require("../../services/course/videoService");
const message = require("~/config/message.json");

const videoController = {
  uploadVideo: async (req, res) => {
    const videoFile = req.file; 

    if (!videoFile) {
      return res.status(400).json({
        success: false,
        title: message.video.uploadError.title,
        description: message.video.uploadError.description.fileMissing,
      });
    }

    try {
      videoService();
      res.status(201).json({
        success: true,
        title: message.video.uploadSuccess.title,
        description: {
          "linkVideo": downloadURL
        }
        ,
      });
    } catch (error) {
      console.error("Error uploading video: ", error);
      res.status(500).json({
        success: false,
        title: message.video.uploadError.title,
        description: error.message || "Failed to upload video.",
      });
    }
  },
};

module.exports = videoController;
