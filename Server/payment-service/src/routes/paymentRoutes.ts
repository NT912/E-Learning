// src/routes/vnpayRouter.ts
import express, { Request, Response, NextFunction } from 'express';
import config from '../../config/index';
import moment from 'moment';
import qs from 'qs';
import crypto from 'crypto';
// import request from 'request';
import axios from 'axios';

const router = express.Router();

const sortObject = (obj: Record<string, any>): Record<string, any> => {
  const sorted: Record<string, any> = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  }
  return sorted;
};

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('orderlist', { title: 'Danh sách đơn hàng' });
});

router.get('/create_payment_url', (req: Request, res: Response, next: NextFunction) => {
  res.render('order', { title: 'Tạo mới đơn hàng', amount: 10000 });
});

router.get('/querydr', (req: Request, res: Response, next: NextFunction) => {
  res.render('querydr', { title: 'Truy vấn kết quả thanh toán' });
});

router.get('/refund', (req: Request, res: Response, next: NextFunction) => {
  res.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' });
});

router.post('/create_payment_url', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  process.env.TZ = 'Asia/Ho_Chi_Minh';

  const date = new Date();
  const createDate = moment(date).format('YYYYMMDDHHmmss');
  const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const tmnCode = config.vnp_TmnCode;
  const secretKey = config.hashSecret;
  const vnpUrl = config.vnp_Url;
  const returnUrl = config.vnp_ReturnUrl;
  const orderId = moment(date).format('DDHHmmss');
  const amount = req.body.amount;
  const bankCode = req.body.bankCode || '';

  let locale = req.body.language || 'vn';
  const currCode = 'VND';
  let vnp_Params: Record<string, any> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: 'Thanh toan cho ma GD:' + orderId,
    vnp_OrderType: 'other',
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr as string,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  const paymentUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });

  res.send(paymentUrl);
});

router.get('/vnpay_return', (req: Request, res: Response, next: NextFunction) => {
  let vnp_Params = req.query;
  console.log(vnp_Params);
  const secureHash = vnp_Params['vnp_SecureHash'] as string;

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const secretKey = config.vnp_HashSecret;
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  if (secureHash === signed) {
    res.json({
      status: 'success',
      message: 'Payment verified successfully',
      data: {
        amount: vnp_Params['vnp_Amount'],
        bankCode: vnp_Params['vnp_BankCode'],
        transactionNo: vnp_Params['vnp_TransactionNo'],
        transactionStatus: vnp_Params['vnp_TransactionStatus'],
        responseCode: vnp_Params['vnp_ResponseCode'],
      }
    });
  } else {
    res.json({
      status: 'error',
      message: 'Invalid secure hash, payment verification failed',
      data: {
        responseCode: '97'
      }
    });
  }
});

router.get('/vnpay_ipn', (req: Request, res: Response, next: NextFunction) => {
  console.log('vnpay_ipn');
  let vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'] as string;

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const secretKey = config.vnp_HashSecret;
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  const paymentStatus = '0';
  const checkOrderId = true;
  const checkAmount = true;

  if (secureHash === signed) {
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus === "0") {
          if (vnp_Params['vnp_ResponseCode'] === "00") {
            res.status(200).json({ RspCode: '00', Message: 'Success' });
          } else {
            res.status(200).json({ RspCode: '00', Message: 'Success' });
          }
        } else {
          res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' });
        }
      } else {
        res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
      }
    } else {
      res.status(200).json({ RspCode: '01', Message: 'Order not found' });
    }
  } else {
    res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
  }
});

router.post('/querydr', (req: Request, res: Response, next: NextFunction) => {
  console.log('querydr');

  process.env.TZ = 'Asia/Ho_Chi_Minh';
  const date = new Date();

  const vnp_TmnCode = config.vnp_TmnCode;
  const secretKey = config.vnp_HashSecret;
  const vnp_Api = config.vnp_Api;

  const vnp_TxnRef = req.body.orderId;
  const vnp_TransactionDate = req.body.transDate;

  const vnp_RequestId = moment(date).format('HHmmss');
  const vnp_Version = '2.1.0';
  const vnp_Command = 'querydr';
  const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;
  const vnp_IpAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

  const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TxnRef}|${vnp_TransactionDate}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;
  const hmac = crypto.createHmac("sha512", secretKey);
  const vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");

  const dataObj = {
    vnp_RequestId,
    vnp_Version,
    vnp_Command,
    vnp_TmnCode,
    vnp_TxnRef,
    vnp_OrderInfo,
    vnp_TransactionDate,
    vnp_CreateDate,
    vnp_IpAddr,
    vnp_SecureHash
  };

//   ãi({
//     url: vnp_Api,
//     method: "POST",
//     json: true,
//     body: dataObj
//   }, (error, response, body) => {
//     console.log(response);
//   });
  sendPaymentRequest(vnp_Api, dataObj);
});

router.post('/refund', (req: Request, res: Response, next: NextFunction) => {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  const date = new Date();

  const vnp_TmnCode = config.vnp_TmnCode;
  const secretKey = config.vnp_HashSecret;
  const vnp_Api = config.vnp_Api;

  const vnp_TxnRef = req.body.orderId;
  const vnp_TransactionDate = req.body.transDate;
  const vnp_Amount = req.body.amount * 100;
  const vnp_TransactionType = req.body.transType;
  const vnp_CreateBy = req.body.user;

  const vnp_RequestId = moment(date).format('HHmmss');
  const vnp_Version = '2.1.0';
  const vnp_Command = 'refund';
  const vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;
  const vnp_IpAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

  const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TransactionType}|${vnp_TxnRef}|${vnp_Amount}|0|${vnp_TransactionDate}|${vnp_CreateBy}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;
  const hmac = crypto.createHmac("sha512", secretKey);
  const vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");

  const dataObj = {
    vnp_RequestId,
    vnp_Version,
    vnp_Command,
    vnp_TmnCode,
    vnp_TransactionType,
    vnp_TxnRef,
    vnp_Amount,
    vnp_TransactionNo: '0',
    vnp_CreateBy,
    vnp_OrderInfo,
    vnp_TransactionDate,
    vnp_CreateDate,
    vnp_IpAddr,
    vnp_SecureHash
  };

//   request({
//     url: vnp_Api,
//     method: "POST",
//     json: true,
//     body: dataObj
//   }, (error, response, body) => {
//     console.log(response);
//   });
  sendPaymentRequest(vnp_Api, dataObj);
});

const sendPaymentRequest = async (vnp_Api: string, dataObj: Record<string, any>) => {
    try {
      const response = await axios.post(vnp_Api, dataObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(response.data); // Logs the response data from VNPAY
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

export default router;
