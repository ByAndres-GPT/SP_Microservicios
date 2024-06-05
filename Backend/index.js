import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./database/db.js";
import usuarioRouter from "./routes/usuarioRouter.js";
import salaRouter from "./routes/salaRouter.js";
import prestamoRouter from "./routes/prestamoRouter.js";
import entradasYsalidasRouter from "./routes/entradasSalidasRouter.js";
import cors from "cors";

db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

//middlewares
app.use(morgan("dev"));
app.use(express.text());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded());

//rutas
app.use("/users", usuarioRouter);
app.use("/salas", salaRouter);
app.use("/prestamos", prestamoRouter);
app.use("/entradasYsalidas", entradasYsalidasRouter);

//puerto
app.listen(
  process.env.PORT,
  console.log("listening on port " + process.env.PORT)
);
