const db = require("../configs/database");
const format = require('pg-format');

module.exports = {
    async insert(form, callback) {

        const response = await db.query(
            "INSERT INTO endereco (cep, rua, bairro, numero, complemento, cidade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_endereco",
            [form.endereco.cep, form.endereco.rua, form.endereco.bairro, form.endereco.numero, form.endereco.complemento, form.endereco.cidade]
        );

        if (response.rowCount == 1) {
            const pedido = await db.query(
                "INSERT INTO pedido (cod_mercado, cod_usuario, cod_endereco, data_pedido, status) VALUES ($1, $2, $3, $4, $5) RETURNING id_pedido",
                [form.cod_mercado, form.cod_usuario, response.rows[0].id_endereco, form.data_pedido, form.status]
            );
            return pedido;
        }

        return;
    },
    async insertCart(values) {
        let query = format('INSERT INTO carrinho (cod_produto, cod_pedido, quantidade) VALUES %L', values);
        const response = await db.query(query);

        return response;
    },
    async select(id) {
        const response = await db.query(
            "SELECT * FROM produto WHERE id_pedido = $1",
            [id]
        );
        return response;
    },
    async selectAll() {
        const response = await db.query(
            "SELECT * FROM pedido LIMIT 30",
            []
        );
        return response;
    },
    async selectClientOrders(id) {
        const response = await db.query(
            "SELECT id_pedido, mercado.nome as mercadoNome, status, data_pedido,entregador.nome, entregador.sobrenome, id_entregador FROM pedido LEFT JOIN entregador ON cod_entregador = id_entregador INNER JOIN mercado ON mercado.id_mercado = pedido.cod_mercado WHERE cod_usuario = $1  ORDER BY data_pedido DESC LIMIT 30",
            [id]
        );
        return response;
    },
    async selectFromMarket(id) {
        const response = await db.query(
            "SELECT * FROM pedido WHERE cod_mercado = $1 AND status='Confirmado' LIMIT 30",
            [id]
        );
        return response;
    },
    async selectCart(id) {
        const response = await db.query(
            "SELECT * FROM carrinho INNER JOIN produto ON cod_produto = id_produto WHERE cod_pedido = $1 ",
            [id]
        );
        return response;
    },
    async selectForDeliverCurrents(id) {
        const response = await db.query(
            "SELECT * FROM pedido INNER JOIN endereco ON cod_endereco = id_endereco WHERE status='Entrega em andamento' AND cod_entregador = $1 LIMIT 30",
            [id]
        );
        return response;
    },
    async selectForDelivers() {
        const response = await db.query(
            "SELECT * FROM pedido INNER JOIN mercado ON cod_mercado = id_mercado INNER JOIN endereco ON mercado.cod_endereco = endereco.id_endereco WHERE status='Pronto para entrega' LIMIT 30",
            []
        );
        return response;
    },
    async selectProductsOrder(id) {
        const response = await db.query(
            "SELECT cod_produto, quantidade, nome, preco FROM carrinho INNER JOIN produto ON cod_produto = id_produto WHERE cod_pedido = $1;",
            [id]
        );
        return response;
    },
    async updateDeliver(id_pedido, cod_entregador) {
        const response = await db.query(
            "UPDATE pedido SET cod_entregador=$1 WHERE id_pedido = $2",
            [cod_entregador, id_pedido]
        );

        const produto = await this.select(id_pedido);

        return produto.rows[0];
    },
    async updateStatus(id_pedido, status) {
        const response = await db.query(
            "UPDATE pedido SET status=$1 WHERE id_pedido = $2",
            [status, id_pedido]
        );

        return response;
    },
    async updateStatusByDeliver(id_pedido, id_entregador, status) {
        const response = await db.query(
            "UPDATE pedido SET status=$1, cod_entregador=$2 WHERE id_pedido = $3",
            [status, id_entregador,id_pedido]
        );

        return response;
    },
    async delete(id) {
        const response = await db.query(
            "DELETE FROM pedido WHERE id_pedido = $1",
            [id]
        );
        return response;
    }
};