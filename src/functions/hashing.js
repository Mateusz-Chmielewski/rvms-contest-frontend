import { createHash } from "crypto";

export const get256Hash = (text) => {
  return createHash("sha256").update(text).digest("hex");
};
