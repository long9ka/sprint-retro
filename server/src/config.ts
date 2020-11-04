import dotenv from "dotenv";

dotenv.config();

export const PORT   = process.env.PORT    ||  8000;
export const DB     = process.env.DB      ||  "mongodb://localhost:27017/sprint-retro";
export const SECRET = process.env.SECRET  ||  "secret";