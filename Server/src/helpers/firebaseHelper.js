const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const app = require("../../config/database/firsebase");
const storage = getStorage(app); 
const message = require("../../config/message.json")

const firebaseHelper = {
    /**
     * Tải video lên Firebase Storage
     * @param {Object} videoFile - File video cần tải lên
     * @return {Promise<String>} - URL tải xuống của video đã tải lên
     */
    uploadVideo: async (videoFile) => {
        try {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${videoFile.originalname}`;
            const storageRef = ref(storage, `videos/${fileName}`);
            await uploadBytes(storageRef, videoFile.buffer); 
            const downloadURL = await getDownloadURL(storageRef); 
            return downloadURL; 
        } catch (error) {
            console.error("Firebase Error uploading video:", error);
            throw new Error(message.video.uploadError.description.failFirebase); 
        }
    },

    uploadFile: async (file) => {
        try {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.originalname}`;
            const storageRef = ref(storage, `file/${fileName}`);
            await uploadBytes(storageRef, file.buffer); 
            const downloadURL = await getDownloadURL(storageRef); 
            return downloadURL; 
        } catch (error) {
            console.error("Firebase Error uploading File:", error);
            throw new Error(message.video.uploadError.description.failFirebase); 
        }
    },

    deleteFile: async (fileLink) => {
        const storage = getStorage();
        const fileRef = ref(storage, fileLink);
        
        try {
            await deleteObject(fileRef);
            console.log(`Deleted file: ${fileLink}`);
        } catch (error) {
            console.error(`Failed to delete file from Firebase: ${error.message}`);
        }
    },

    uploadAvatarCourse: async (pictureFile) => {
        try {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${pictureFile.originalname}`;
            const storageRef = ref(storage, `Course_Avatar/${fileName}`);
            await uploadBytes(storageRef, pictureFile.buffer); 
            const downloadURL = await getDownloadURL(storageRef); 
            return downloadURL; 
        } catch (error) {
            console.error("Firebase Error uploading video:", error);
            throw new Error(message.video.uploadError.description.failFirebase); 
        }
    },
}

module.exports = firebaseHelper;