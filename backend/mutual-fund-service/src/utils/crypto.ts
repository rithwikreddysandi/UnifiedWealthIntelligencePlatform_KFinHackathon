import crypto from "crypto";

export const generateHmacSignature = (
  payload: string,
  secret: string,
): string => {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
};

export const verifyHmacSignature = (
  payload: string,
  signature: string,
  secret: string,
): boolean => {
  const generatedSignature = generateHmacSignature(payload, secret);

  return generatedSignature === signature;
};

export const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateSecretKey = (): string => {
  return crypto.randomBytes(64).toString("hex");
};
