import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/volunteers", volunteerRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Backend работает" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server started on " + PORT);
});