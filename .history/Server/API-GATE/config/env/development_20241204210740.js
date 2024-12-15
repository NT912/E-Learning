module.exports = {
  port: process.env.PORT,
  service_host: {
    auth: process.env.AUTH_SERVICE,
    course: process.env.COURSE_SERVICE,
    profile: process.env.PROFILE_SERVICE,
  },
};
