// index.js
const express = require('express');
require('dotenv').config();
// Importação das rotas
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');
const pedidosRoutes = require('./routes/pedidos');
const app = express();
app.use(express.json());
// Vinculação dos roteadores aos seus respectivos prefixos de URL
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRoutes);
app.use('/pedidos', pedidosRoutes);
// Tratamento de rota não encontrada (404)
app.use((req, res) => {
 res.status(404).json({ mensagem: 'Rota não encontrada.' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});