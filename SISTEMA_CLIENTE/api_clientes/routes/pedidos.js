const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { cliente_id, valor_total } = req.body;

    if (!cliente_id || valor_total === undefined) {
        return res.status(400).json({
            mensagem: 'cliente_id e valor_total são obrigatórios.'
        });
    }

    try {
        const [result] = await db.execute(
            `INSERT INTO pedidos
            (cliente_id, valor_total)
            VALUES (?, ?)`,
            [cliente_id, valor_total]
        );

        res.status(201).json({
            id: result.insertId,
            cliente_id,
            valor_total,
            status: 'pendente'
        });

    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro ao criar pedido.',
            detalhes: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT id, cliente_id, data_pedido, status, valor_total
             FROM pedidos`
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar pedidos.',
            detalhes: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT id, cliente_id, data_pedido, status, valor_total
             FROM pedidos
             WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar pedido.',
            detalhes: error.message
        });
    }
});

router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            mensagem: 'O status é obrigatório.'
        });
    }

    try {
        const [result] = await db.execute(
            `UPDATE pedidos
             SET status = ?
             WHERE id = ?`,
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Status do pedido atualizado com sucesso.'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar status do pedido.',
            detalhes: error.message
        });
    }
});

router.post('/:id/itens', async (req, res) => {
    const { id } = req.params;
    const { produto_id, quantidade, preco_unitario } = req.body;

    if (!produto_id || !quantidade || preco_unitario === undefined) {
        return res.status(400).json({
            mensagem: 'produto_id, quantidade e preco_unitario são obrigatórios.'
        });
    }

    try {
        const [pedido] = await db.execute(
            'SELECT id FROM pedidos WHERE id = ?',
            [id]
        );

        if (pedido.length === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        const [result] = await db.execute(
            `INSERT INTO itens_pedido
            (pedido_id, produto_id, quantidade, preco_unitario)
            VALUES (?, ?, ?, ?)`,
            [id, produto_id, quantidade, preco_unitario]
        );

        res.status(201).json({
            id: result.insertId,
            pedido_id: Number(id),
            produto_id,
            quantidade,
            preco_unitario
        });

    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro ao adicionar item ao pedido.',
            detalhes: error.message
        });
    }
});

router.delete('/:id_pedido/itens/:id_item', async (req, res) => {
    const { id_pedido, id_item } = req.params;

    try {
        const [result] = await db.execute(
            `DELETE FROM itens_pedido
             WHERE id = ? AND pedido_id = ?`,
            [id_item, id_pedido]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Item do pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Item removido do pedido com sucesso.'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao remover item do pedido.',
            detalhes: error.message
        });
    }
});

module.exports = router;