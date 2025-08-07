import express from 'express';
import cors from 'cors';
import path from "path";
import uploadRoute from "./routes/uploadRoutes.js";
import clientRoutes from './routes/clientRoute.js';
import menuRoutes from './routes/menuRoutes.js';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use('/api', clientRoutes);
app.use('/api', menuRoutes);
app.use("/upload", uploadRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});


