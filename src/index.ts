import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import helmet from "helmet";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("🎫 Ticket Management API with Typescript is running!!!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tickets", ticketRoutes);

// Handle errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    // connect to the database
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
