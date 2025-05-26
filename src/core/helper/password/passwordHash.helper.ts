import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10); // Salt + costo
  return await bcrypt.hash(password, salt);
};

// const isValid = await bcrypt.compare(password, hashedPassword);