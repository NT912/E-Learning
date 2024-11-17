import dotenv from 'dotenv';
dotenv.config();

export default {
  /* 
  PORT
  */
  port: process.env.PORT,
  /* 
  DATABASE
  */
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  /* 
  VNOPAY
  */
  vnp_TmnCode: process.env.VNP_TMN_CODE,
  hashSecret: process.env.VNP_HASH_SECRET,
  vnp_HashSecret: process.env.VNP_HASH_SECRET,
  vnp_Url: process.env.VNP_URL,
  vnp_ReturnUrl: process.env.VNP_RETURN_URL,
};
