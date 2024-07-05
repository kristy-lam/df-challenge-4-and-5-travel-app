import mongoose from "mongoose";

export default class Database {
  #uri;

  constructor(uri) {
    this.#uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.#uri);
      return console.log(`Database connection was successful`);
    } catch (e) {
      console.log("Database connection error", e);
    }
  }

  async close() {
    await mongoose.connection.close();
  }
}
