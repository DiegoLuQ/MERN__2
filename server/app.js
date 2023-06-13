import express from "express";
import postRoutes from "./routes/post.routes.js";
import fileUpload from "express-fileupload";
import cors from "cors"
const app = express(); // creamos express

//middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"]
}))
app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);
// routes
app.use(postRoutes); // añadimos las rutas
export default app; // exportamos la app
