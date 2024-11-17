import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  vnp_TmnCode: process.env.VNP_TMN_CODE || 'PROD_TMN_CODE',
  vnp_HashSecret: process.env.VNP_HASH_SECRET || 'PROD_HASH_SECRET',
  vnp_Url: process.env.VNP_URL || 'https://vnpayment.vn/paymentv2/vpcpay.html',
  vnp_ReturnUrl: process.env.VNP_RETURN_URL || 'https://yourdomain.com/vnpay_return',
};
