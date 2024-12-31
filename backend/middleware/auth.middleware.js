const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    console.log("=== DÉBUT MIDDLEWARE AUTH ===");

    // Vérifier le header Authorization
    const authHeader = req.headers.authorization;
    console.log("Header d'autorisation reçu:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Token non fourni ou format invalide");
      return res.status(401).json({
        success: false,
        message: "Token non fourni",
      });
    }

    // Récupérer le token
    const token = authHeader.split(" ")[1];
    console.log("Token extrait:", token.substring(0, 20) + "...");

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token décodé:", decoded);

      // Récupérer l'utilisateur
      const user = await User.findById(decoded.id).select("-password");
      console.log("Utilisateur trouvé:", user ? "Oui" : "Non");

      if (!user) {
        console.log("Utilisateur non trouvé dans la base de données");
        return res.status(401).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      // Ajouter l'utilisateur à la requête
      req.user = user;
      console.log("=== FIN MIDDLEWARE AUTH (Succès) ===");
      next();
    } catch (tokenError) {
      console.error("Erreur de vérification du token:", tokenError);
      return res.status(401).json({
        success: false,
        message: "Token invalide",
      });
    }
  } catch (error) {
    console.error("=== ERREUR MIDDLEWARE AUTH ===");
    console.error("Type d'erreur:", error.name);
    console.error("Message d'erreur:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(401).json({
      success: false,
      message: "Erreur d'authentification",
      error: error.message,
    });
  }
};
