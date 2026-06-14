import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Backend работает"
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});