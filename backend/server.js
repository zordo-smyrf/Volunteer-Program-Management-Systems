import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const isLocalhost = origin.startsWith('http://localhost:');
        const isVercel = origin.endsWith('.vercel.app');

        if (isLocalhost || isVercel) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/volunteers", volunteerRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Backend работает" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on port " + PORT);
});