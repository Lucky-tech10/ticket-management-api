import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to connect to the database
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
};
export { prisma }; // Export the Prisma client for use in other modules
// export the connectDB function
export default connectDB;
