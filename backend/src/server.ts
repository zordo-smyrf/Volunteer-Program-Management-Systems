import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes";
import volunteerRoutes from "./routes/volunteerRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Backend работает"
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});