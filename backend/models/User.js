const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    timestamps: true,
});

// Hash le mot de passe avant de sauvegarder
userSchema.pre("save", async function(next) {
    try {
        console.log("=== PRE SAVE USER ===");
        console.log("Modification du mot de passe:", this.isModified("password"));

        if (this.isModified("password")) {
            console.log("Hashage du mot de passe...");
            this.password = await bcrypt.hash(this.password, 10);
            console.log("Mot de passe hashé avec succès");
        }

        console.log("=== FIN PRE SAVE USER ===");
        next();
    } catch (error) {
        console.error("Erreur dans le middleware pre-save:", error);
        next(error);
    }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);