const dbSetting = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  timezone: "jst",
};

exports.dbSetting = dbSetting;
