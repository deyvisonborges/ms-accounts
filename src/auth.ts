import Bcrypt from "bcryptjs";
import Jwt, { VerifyOptions } from "jsonwebtoken";
import Fs from "fs";

const privateKey = Fs.readFileSync("./keys/private.key", "utf-8");
const publickey = Fs.readFileSync("./keys/public.key", "utf-8");
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = "RS256";

function hashPassword(password: string) {
  return Bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashedPassword: string) {
  return Bcrypt.compareSync(password, hashedPassword);
}

// autenticacao assimetrica

type Token = {
  accountId: number;
};

function sign(accountId: number) {
  const token: Token = { accountId };
  return Jwt.sign(token, privateKey, {
    expiresIn: jwtExpires,
    algorithm: jwtAlgorithm,
  });
}

function verify(token: string) {
  try {
    const decoded = Jwt.verify(token, publickey, {
      algorithm: [jwtAlgorithm],
    } as VerifyOptions) as Token;

    return {
      accountId: decoded.accountId,
    };
  } catch (err) {
    throw new Error("Erro ao decodificar token.");
  }
}

export default {
  hashPassword,
  comparePassword,
  sign,
  verify,
};
