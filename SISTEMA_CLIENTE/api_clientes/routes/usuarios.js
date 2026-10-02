const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE: Inserir usuário
router.post('/', async (req, res) => {
    const { nome, email, senha, perfil, status } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: 'Nome, email e senha são obrigatórios.'
        });
    }

    try {
        const [result] = await db.execute(
            `INSERT INTO usuarios
            (nome, email, senha, perfil, status)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nome,
                email,
                senha,
                perfil || 'operador',
                status || 'ativo'
            ]
        );

        res.status(201).json({
            id: result.insertId,
            nome,
            email,
            perfil: perfil || 'operador',
            status: status || 'ativo'
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                mensagem: 'Email já cadastrado.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro interno no servidor.',
            detalhes: error.message
        });
    }
});

// READ: Listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, nome, email, perfil, status, criado_em FROM usuarios'
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar usuários.',
            detalhes: error.message
        });
    }
});

// READ: Buscar usuário por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT id, nome, email, perfil, status, criado_em FROM usuarios WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar usuário.',
            detalhes: error.message
        });
    }
});

// UPDATE: Atualização completa do usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, perfil, status } = req.body;

    if (!nome || !email || !senha || !perfil || !status) {
        return res.status(400).json({
            mensagem: 'Nome, email, senha, perfil e status são obrigatórios.'
        });
    }

    try {
        const [result] = await db.execute(
            `UPDATE usuarios
             SET nome = ?, email = ?, senha = ?, perfil = ?, status = ?
             WHERE id = ?`,
            [nome, email, senha, perfil, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso.'
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                mensagem: 'Email já cadastrado.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro ao atualizar usuário.',
            detalhes: error.message
        });
    }
});

// UPDATE PARCIAL: Alterar apenas os campos enviados
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, perfil, status } = req.body;

    if (
        nome === undefined &&
        email === undefined &&
        senha === undefined &&
        perfil === undefined &&
        status === undefined
    ) {
        return res.status(400).json({
            mensagem: 'Informe pelo menos um campo para atualizar.'
        });
    }

    try {
        const campos = [];
        const valores = [];

        if (nome !== undefined) {
            campos.push('nome = ?');
            valores.push(nome);
        }

        if (email !== undefined) {
            campos.push('email = ?');
            valores.push(email);
        }

        if (senha !== undefined) {
            campos.push('senha = ?');
            valores.push(senha);
        }

        if (perfil !== undefined) {
            campos.push('perfil = ?');
            valores.push(perfil);
        }

        if (status !== undefined) {
            campos.push('status = ?');
            valores.push(status);
        }

        valores.push(id);

        const [result] = await db.execute(
            `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`,
            valores
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Usuário atualizado parcialmente com sucesso.'
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                mensagem: 'Email já cadastrado.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro ao atualizar usuário.',
            detalhes: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Usuário excluído com sucesso.'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao excluir usuário.',
            detalhes: error.message
        });
    }
});

module.exports = router;