import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend работает"
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});