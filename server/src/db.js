const { connect } = require("mongoose")

const connectDb = async () => {
  return connect(process.env.DB_URI, { dbName: process.env.DB_NAME }, () => {
    console.log(`Connected to ${process.env.DB_NAME} database Successfully`);
  })
}

module.exports = { connectDb }
