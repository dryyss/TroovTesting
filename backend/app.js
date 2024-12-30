const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Configuration CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser les requêtes sans origine (comme les appels d'API)
      if (!origin) return callback(null, true);

      // Vérifier si l'origine commence par http://localhost:
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      callback(new Error("Non autorisé par CORS"));
    },
    credentials: true,
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
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
