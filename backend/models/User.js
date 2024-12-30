const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
<<<<<<< HEAD
        required: true,
=======
        required: [true, "Le prénom est requis"],
>>>>>>> feature/dashboard-kanban-calendar
        trim: true,
    },
    lastName: {
        type: String,
<<<<<<< HEAD
        required: true,
=======
        required: [true, "Le nom est requis"],
>>>>>>> feature/dashboard-kanban-calendar
        trim: true,
    },
    email: {
        type: String,
<<<<<<< HEAD
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
=======
        required: [true, "L'email est requis"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Veuillez fournir un email valide"],
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
>>>>>>> feature/dashboard-kanban-calendar
    },
}, {
    timestamps: true,
});

<<<<<<< HEAD
module.exports = mongoose.model("User", userSchema);
=======
// Hash le mot de passe avant la sauvegarde
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("User", userSchema);
>>>>>>> feature/dashboard-kanban-calendar
