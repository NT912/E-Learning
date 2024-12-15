import { promises as fs } from "fs";
import path from "path";

interface File {
  originalname: string;
  buffer?: Buffer; // Buffer nếu được cung cấp
  path?: string;   // Đường dẫn tạm thời nếu file được lưu trong hệ thống
}

const fileHelper = {
  /**
   * Uploads a video to the public/videos directory.
   * @param {File} videoFile - The video file to upload.
   * @return {Promise<string>} - The public path of the uploaded video.
   */
  uploadVideo: async (videoFile: File): Promise<string> => {
    return await uploadFileToDirectory(videoFile, "videos");
  },

  /**
   * Uploads a file to the public/files directory.
   * @param {File} file - The file to upload.
   * @return {Promise<string>} - The public path of the uploaded file.
   */
  uploadFile: async (file: File): Promise<string> => {
    return await uploadFileToDirectory(file, "files");
  },

  /**
   * Uploads a course avatar to the public/avatars directory.
   * @param {File} pictureFile - The picture file to upload.
   * @return {Promise<string>} - The public path of the uploaded avatar.
   */
  uploadAvatarCourse: async (pictureFile: File): Promise<string> => {
    return await uploadFileToDirectory(pictureFile, "avatars");
  },

  /**
   * Deletes a file from the public directory.
   * @param {string} fileLink - The public path to the file.
   */
  deleteFile: async (fileLink: string): Promise<void> => {
    try {
      const filePath = path.resolve("public", fileLink);
      await fs.unlink(filePath);
      console.log(`Deleted file: ${fileLink}`);
    } catch (error) {
      console.error(`Failed to delete file: ${(error as Error).message}`);
    }
  },
};

/**
 * Helper function to upload a file to a specific directory in the public folder.
 * @param {File} file - The file to upload.
 * @param {string} subDirectory - The subdirectory inside the public folder.
 * @return {Promise<string>} - The public path of the uploaded file.
 */
const uploadFileToDirectory = async (file: File, subDirectory: string): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    const uploadPath = path.resolve("../public", subDirectory, fileName);

    // Ensure the directory exists
    await fs.mkdir(path.dirname(uploadPath), { recursive: true });

    // Read buffer from file.path if buffer is not provided
    let fileContent: Buffer;
    if (file.buffer) {
      fileContent = file.buffer;
    } else if (file.path) {
      fileContent = await fs.readFile(file.path);
    } else {
      throw new Error("No valid file content to upload");
    }

    // Write the file to the public directory
    await fs.writeFile(uploadPath, fileContent);

    // Return the public URL
    return `/public/${subDirectory}/${fileName}`;
  } catch (error) {
    console.error(`Error uploading file to /${subDirectory}:`, error);
    throw new Error("Failed to upload file");
  }
};

export default fileHelper;
