import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import knowledgeModel from './models/knowledges.js'; // Add your model here

mongoose.plugin(mongoosePaginate);

const MongoDb = async ({ config, onDBInit, onError, onDisconnect, isServerless = false }) => {
  let conn = null;

  const connectToDatabase = async () => {
    if (conn == null || (isServerless && mongoose.connection.readyState !== 1)) {
      try {
        console.log("Connecting to DB...");
        const dbUri = await config.get("db.host");
        conn = await mongoose.connect(dbUri, {
          dbName: "orbital"
        });
        mongoose.model("knowledges", knowledgeModel); // Add your model here
        console.log("Connected to DB");

        const schemas = {};
        const models = conn.models;

        Object.keys(models).forEach((modelName) => {
          let pathObject = models[modelName].schema.paths;
          schemas[modelName] = pathObject;
        });

        onDBInit(models, schemas);

        mongoose.connection.on("error", (err) => {
          console.log("Mongoose default connection error: " + err);
          if (onError) {
            onError(err);
          }
        });

        mongoose.connection.on("disconnected", () => {
          console.log("Mongoose default connection disconnected");
          if (onDisconnect) {
            onDisconnect();
          }
        });
      } catch (err) {
        console.log("connect error", err);
        if (onError) {
          onError(err);
        }
      }
    }
    return conn;
  };

  // Handle termination signals to close the connection in non-serverless environments
  if (!isServerless) {
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
      });
    });
  }

  try {
    await connectToDatabase();
  } catch (err) {
    console.log("Error during database connection", err);
    if (onError) {
      onError(err);
    }
  }
};

export default MongoDb;