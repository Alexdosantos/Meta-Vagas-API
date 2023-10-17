import bcrypt from "bcrypt";

class Crypto {
  static cryptography(text: string) {
    return bcrypt.hashSync(text, 10);
  }
  static compare(text: string, hash: string) {
    return bcrypt.compareSync(text, hash);
  }
}
export { Crypto };
