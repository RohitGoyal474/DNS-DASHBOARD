import dotenv from "dotenv";
dotenv.config();
import connectDB from "./DB/index.js";
import express from "express";
import cors from "cors";
import userRouter from "./Routes/User.Route.js";
import hostedZoneRouter from "./Routes/HostedZone.route.js";
import ResourceRecordsRouter from "./Routes/ResourceRecords.route.js";
import cookieParser from "cookie-parser";

const app = express();
await connectDB();
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/HostedZone", hostedZoneRouter);
app.use("/api/v1/ResourceRecords", ResourceRecordsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
