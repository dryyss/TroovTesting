const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async(req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Un utilisateur avec cet email existe déjà",
            });
        }

        // Créer un nouvel utilisateur
        const user = new User({
            email,
            password,
            firstName,
            lastName,
        });

        await user.save();

        // Générer le token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

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
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'inscription",
        });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect",
            });
        }

        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect",
            });
        }

        // Générer le token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

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
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion",
        });
    }
};

exports.getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

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
        console.error("Erreur lors de la récupération du profil:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération du profil",
        });
    }
};
