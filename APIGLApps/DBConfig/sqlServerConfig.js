const msSqlconfig = {
  user: "sa", // sql user
  password: "server", //sql user password
  server: "ODCLAP0102", // if it does not work try- localhost
  database: "COMMON_DB",
  options: {
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "MSSQLSERVER", // SQL Server instance name
  },
  port: 1433,
};

module.exports = msSqlconfig;
