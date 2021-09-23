import express, { Application } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cors from "cors";

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 5000);

// Middlwares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// Routes
import index from './routes/index.routes';
app.use('/api', index);

export default function createServer() {
  app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
  });
}
