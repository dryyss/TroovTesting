const mongoose = require("mongoose");

<<<<<<< HEAD
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
=======
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

// Hash le mot de passe avant de sauvegarder
userSchema.pre("save", async function (next) {
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
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
>>>>>>> feature/dashboard

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
