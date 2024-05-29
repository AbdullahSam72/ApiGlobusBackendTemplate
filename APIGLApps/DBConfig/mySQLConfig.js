const mySqlConfig = {
  db: {
    user: "root", // sql user
    password: "server", //sql user password
    host: "localhost", // if it does not work try- localhost
    database: "GL_COMMON",
    connectTimeout: 60000,
    multipleStatements: true,
  },
};

module.exports = mySqlConfig;
