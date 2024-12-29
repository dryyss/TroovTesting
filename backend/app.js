const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Configuration CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware pour parser le JSON
app.use(express.json());

// Log des requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Importer les routes
const authRoutes = require("./routes/auth.routes");

// Routes de base
app.get("/", (req, res) => {
  res.json({ message: "API Troov Backend" });
});

// Utiliser les routes
app.use("/api/auth", authRoutes);

// Middleware de gestion des erreurs (doit être après les routes)
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error("Erreur globale:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Une erreur est survenue sur le serveur",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

// Port
const PORT = process.env.PORT || 3001;

// Configuration de Mongoose
mongoose.set("debug", true); // Active les logs de debug MongoDB

// Connexion MongoDB avec plus de logs
async function connectDB() {
  try {
    console.log("=== TENTATIVE DE CONNEXION MONGODB ===");
    console.log(
      "URI:",
      process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("=== CONNEXION MONGODB RÉUSSIE ===");
    console.log("Nom de la base:", mongoose.connection.db.databaseName);
    console.log("Host:", mongoose.connection.host);

    // Écouter les événements de connexion
    mongoose.connection.on("error", (err) => {
      console.error("Erreur MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB déconnecté");
    });

    // Démarrer le serveur une fois connecté
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (err) {
    console.error("=== ERREUR DE CONNEXION MONGODB ===");
    console.error("Type d'erreur:", err.name);
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    process.exit(1);
  }
}

// Lancer la connexion
connectDB();

module.exports = app;
