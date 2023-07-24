import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import Routes
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
