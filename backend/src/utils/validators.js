exports.isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
exports.isValidPhone = (phone) => /^\d{10,15}$/.test(phone);
