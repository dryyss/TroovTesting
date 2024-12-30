const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Configuration CORS
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware pour parser le JSON
app.use(express.json());

// Importer les routes
const authRoutes = require("./routes/auth.routes");

// Routes de base
app.get("/", (req, res) => {
  res.json({ message: "API Troov Backend" });
});

// Utiliser les routes
app.use("/api/auth", authRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Une erreur est survenue sur le serveur",
  });
});

// Port
const PORT = process.env.PORT || 3001;

// Connexion MongoDB avec options
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB:", err);
    process.exit(1);
  });

module.exports = app;
