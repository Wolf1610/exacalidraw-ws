import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import roomRouter from "./routes/room";
import { PORT } from "@repo/backend-common/config";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRouter);
app.use("/room", roomRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));