const express = require("express");
const cors = require("cors");

const violationRoutes = require("./routes/violations.routes");

const app = express();

// Allow Railway health check hostname
app.use(cors({
  origin: ['healthcheck.railway.app', '*'],
  credentials: true
}));
app.use(express.json());

app.use("/api/violations", violationRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = app;
