import app from "./src/app.js";
import dotenv from "dotenv";
import { ConnectToDB } from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
ConnectToDB()
app.listen(PORT, () => {
  console.log(`Server Running at Port: ${PORT}`);
});
