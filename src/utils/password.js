// src/utils/password.js
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

export default {
  hashPassword,
  comparePassword,
};
