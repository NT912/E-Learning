const { db } = require("./src/config/db");

const testDatabaseConnection = async () => {
  try {
    const request = await sqlRequest();
    const result = await request.query("SELECT 1 as number");
    console.log("Test query result: ", result.recordset);
  } catch (err) {
    console.error("Error in test query: ", err.message);
  }
};

testDatabaseConnection();
