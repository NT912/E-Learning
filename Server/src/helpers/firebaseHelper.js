const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const app = require("../config/firsebase");
const storage = getStorage(app); 
const message = require("../config/message.json")

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
            console.log(downloadURL);
            return downloadURL; 
        } catch (error) {
            console.error("Firebase Error uploading video:", error);
            throw new Error(message.video.uploadError.description.failFirebase); 
        }
    },
}

module.exports = firebaseHelper;