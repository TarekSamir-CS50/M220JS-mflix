const MongoClient = require("mongodb").MongoClient
const NodeEnvironment = require("jest-environment-node")
module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.mflixClient) {
      this.global.mflixClient = await MongoClient.connect(
        process.env.MFLIX_DB_URI,
        // TODO: Connection Pooling
        // Set the connection pool size to 50 for the testing environment.
        {
          poolSize: 50,
          wtimeout: 2500,
          w: "majority",
          useNewUrlParser: true,
          useUnifiedTopology: true 
        },
        // TODO: Timeouts
        // Set the write timeout limit to 2500 milliseconds for the testing environment.
       
     
      )
      await super.setup()
    }