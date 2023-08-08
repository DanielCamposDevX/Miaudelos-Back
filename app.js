import express from "express";
import cors from "cors";
import Routes from "./src/routes/index.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(Routes);


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})