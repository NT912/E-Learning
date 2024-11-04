const connection = require("../../config/database/db");

const userTokenModel = {
    saveToken: async (userId, fcmToken, deviceType) => {
      return new Promise((resolve, reject) => {
        const query = `
          INSERT INTO user_tokens (UserID, FCM_token, DeviceType, CreatedAt, UpdatedAt)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON DUPLICATE KEY UPDATE
            FCM_token = VALUES(FCM_token),
            UpdatedAt = CURRENT_TIMESTAMP
        `;
  
        connection.query(query, [userId, fcmToken, deviceType], (err, results) => {
          if (err) {
            reject(new Error("Error saving FCM token"));
          } else {
            resolve(results);
          }
        });
      });
    },

    findTokenByEmail: async (email) => {
        return new Promise((resolve, reject) => {
          const query = `
            SELECT FCM_token FROM user_tokens
            INNER JOIN user ON user.UserID = user_tokens.UserID
            WHERE user.Email = ?
          `;
    
          connection.query(query, [email], (err, results) => {
            if (err) {
              reject(new Error("Error fetching FCM token by email"));
            } else {
              resolve(results[0]?.FCM_token || null);
            }
          });
        });
      },
  };
  
  module.exports = userTokenModel;
  