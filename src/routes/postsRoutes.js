import express from "express";
import multer from "multer";
import cors from "cors";

// Importa as funções controladoras para lidar com as requisições HTTP
import { listarPosts, listarUsuarios, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200  
}

// Configura o armazenamento de arquivos utilizando o multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos enviados
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    // Define o nome do arquivo no destino
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função que define as rotas da aplicação
const routes = (app) => {
    // Habilita o parser JSON para lidar com corpos de requisições em formato JSON
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para obter a lista de todos os posts
    app.get("/posts", listarPosts);
    // Rota para obter a lista de todos os usuários
    app.get("/usuarios", listarUsuarios)
    // Rota para criar um novo post
    app.post("/posts", postarNovoPost)
    // Rota para fazer upload de uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;