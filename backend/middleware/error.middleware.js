const errorHandler = (err, req, res, next) => {
  console.error("=== ERREUR MIDDLEWARE ===");
  console.error("Type:", err.name);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      details: Object.values(err.errors).map((error) => error.message),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Cet email est déjà utilisé",
    });
  }

  res.status(500).json({
    success: false,
    message: "Erreur interne du serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
