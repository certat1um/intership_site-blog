import path from "path";
import express from "express";
import methodOverride from "method-override";
import { router as errorRoutes } from "./routes/error-routes";
import { router as postAPIRoutes } from "./routes/api-post-routes";
import { router as singleRoutes } from "./routes/single-routes";
import { router as postRoutes } from "./routes/post-routes";

const app = express();

const PORT = 3000;

app.listen(PORT, "localhost", () => {
  console.log("Server is running...");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(postAPIRoutes);
app.use(singleRoutes);
app.use(postRoutes);
app.use(errorRoutes);
