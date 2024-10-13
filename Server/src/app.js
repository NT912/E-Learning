require('module-alias/register.js');
const express = require('express');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const authRoutes = require('~/routes/authRoutes');
const userRoutes = require('~/routes/userRoutes');
const courseRoutes = require('~/routes/courseRoutes');
const paymentRoutes = require('~/routes/paymentRoutes');
const discussionRoutes = require('~/routes/discussionRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/course', courseRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`Server running: http://localhost:${PORT}/`)
);
