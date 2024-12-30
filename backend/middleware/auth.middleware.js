const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async(req, res, next) => {
    try {
        // Vérifier le header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token non fourni" });
        }

        // Récupérer le token
        const token = authHeader.split(" ")[1];

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer l'utilisateur
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // Ajouter l'utilisateur à la requête
        req.user = user;
        next();
    } catch (error) {
        console.error("Erreur d'authentification:", error);
        res.status(401).json({ message: "Token invalide" });
    }
};
