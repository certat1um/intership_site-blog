import * as dotenv from "dotenv";
import path from "path";
import express from "express";
import methodOverride from "method-override";
import { router as userAPIRoutes } from "./routes/api-user-routes";
import { router as postAPIRoutes } from "./routes/api-post-routes";

const app = express();
const PORT = 3000;
dotenv.config();

app.listen(PORT, "localhost", () => {
  console.log("Server is running...");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(userAPIRoutes);
app.use(postAPIRoutes);
