import bcrypt from 'bcrypt';

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    // Handle error
    console.error(error);
    return false;
  }
}
