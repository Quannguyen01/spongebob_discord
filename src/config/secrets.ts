import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const DISCORD_TOKEN = process.env["token"];
export const IMGFLIP_ACCT = process.env["username"] || "";
export const IMGFLIP_PWD = process.env["password"] || "";

if (!DISCORD_TOKEN) {
  console.error("No 'discord token' provided in .env file.");
}
