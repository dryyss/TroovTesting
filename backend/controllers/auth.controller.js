const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Génération du token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  try {
    console.log("=== DÉBUT INSCRIPTION ===");
    console.log("Données reçues:", req.body);

    const { email, password, firstName, lastName } = req.body;
    console.log("Données extraites:", {
      email,
      firstName,
      lastName,
      passwordLength: password ? password.length : 0,
    });

    // Vérifier si l'utilisateur existe déjà
    console.log("Recherche d'un utilisateur existant avec l'email:", email);
    const existingUser = await User.findOne({ email });
    console.log("Résultat de la recherche:", existingUser);

    if (existingUser) {
      console.log("Utilisateur déjà existant");
      return res.status(400).json({
        success: false,
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    console.log("Création d'un nouvel utilisateur");
    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    console.log("Tentative de sauvegarde...");
    await user.save();
    console.log("Sauvegarde réussie! ID:", user._id);

    // Générer le token
    const token = generateToken(user._id);

    console.log("=== FIN INSCRIPTION ===");
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("=== ERREUR INSCRIPTION ===");
    console.error("Type d'erreur:", error.name);
    console.error("Message d'erreur:", error.message);
    console.error("Stack trace:", error.stack);
    if (error.errors) {
      console.error(
        "Erreurs de validation:",
        JSON.stringify(error.errors, null, 2)
      );
    }
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'inscription",
      error: error.message,
      details: error.errors,
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("=== DÉBUT LOGIN ===");
    console.log("Données reçues:", req.body);

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    console.log("Utilisateur trouvé:", user ? "Oui" : "Non");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await user.comparePassword(password);
    console.log("Mot de passe valide:", isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    // Générer le token
    const token = generateToken(user._id);

    console.log("=== FIN LOGIN ===");
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("=== ERREUR LOGIN ===");
    console.error("Type d'erreur:", error.name);
    console.error("Message d'erreur:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la connexion",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log("=== DÉBUT GET PROFILE ===");
    console.log("Headers reçus:", req.headers);

    const authHeader = req.headers.authorization;
    console.log("Header d'autorisation:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Token manquant ou format invalide");
      return res.status(401).json({
        success: false,
        message: "Token manquant ou invalide",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extrait:", token.substring(0, 20) + "...");

    console.log("Vérification du token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);

    console.log("Recherche de l'utilisateur avec l'ID:", decoded.id);
    const user = await User.findById(decoded.id);
    console.log("Utilisateur trouvé:", user ? "Oui" : "Non");

    if (!user) {
      console.log("Utilisateur non trouvé dans la base de données");
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    console.log("=== FIN GET PROFILE ===");
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("=== ERREUR GET PROFILE ===");
    console.error("Type d'erreur:", error.name);
    console.error("Message d'erreur:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log("=== DÉBUT UPDATE PROFILE ===");
    console.log("Données reçues:", req.body);

    const { firstName, lastName, email, currentPassword, newPassword } =
      req.body;
    const userId = req.user.id;

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Cet email est déjà utilisé",
        });
      }
    }

    // Mettre à jour les informations de base
    const updateData = { firstName, lastName, email };

    // Si un changement de mot de passe est demandé
    if (currentPassword && newPassword) {
      // Vérifier l'ancien mot de passe
      const isValidPassword = await req.user.comparePassword(currentPassword);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Mot de passe actuel incorrect",
        });
      }

      // Hasher le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    console.log("=== FIN UPDATE PROFILE ===");
    res.json({
      success: true,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    });
  } catch (error) {
    console.error("=== ERREUR UPDATE PROFILE ===");
    console.error("Type d'erreur:", error.name);
    console.error("Message d'erreur:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    console.log("=== DÉBUT LOGOUT ===");

    // Récupérer le token depuis les headers
    const authHeader = req.headers.authorization;
    console.log("Token de déconnexion:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Pas de token fourni");
      return res.status(200).json({
        success: true,
        message: "Déconnexion réussie",
      });
    }

    console.log("=== FIN LOGOUT ===");
    res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    console.error("=== ERREUR LOGOUT ===");
    console.error("Type d'erreur:", error.name);
    console.error("Message d'erreur:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la déconnexion",
      error: error.message,
    });
  }
};
