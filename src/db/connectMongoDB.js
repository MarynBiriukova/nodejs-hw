import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try{
  const dbUrl = process.env.MONGO_URL;
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connection established successfully");
  } catch (error) {
    console.log('❌Error connection to mongoDB', error.message);
    process.exit(1);
  }
};
/*export async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb+srv://<db_username>:<db_password>@cluster0.ln8h0vf.mongodb.net/");
    console.log("You successfully connected to MongoDB!");
    return mongoose;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}*/
