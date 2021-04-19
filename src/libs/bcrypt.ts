import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export async function validatePassword(
  password: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, savedPassword);
}
