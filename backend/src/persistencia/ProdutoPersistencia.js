const db = require("../configs/database");

module.exports = {
    async insert(form, callback) {

        const produto = await db.query(
            "INSERT INTO produto (nome, descricao, preco, url_img, estoque, cod_mercado, preco_lista) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_produto",
            [form.nome, form.descricao, form.preco, form.url_img, form.estoque, form.cod_mercado, form.preco_lista ]
        );
        return produto;
    },
    async select(id) {
        const response = await db.query(
            "SELECT * FROM produto WHERE id_produto = $1",
            [id]
        );
        return response;
    },
    async selectAll() {
        const response = await db.query(
            "SELECT * FROM produto LIMIT 30",
            []
        );
        return response;
    },
    async selectFromMarket(id) {
        const response = await db.query(
            "SELECT * FROM produto WHERE cod_mercado = $1 LIMIT 30",
            [id]
        );
        return response;
    },
    async searchProductFromMarket(search, id) {
        const response = await db.query(
            "SELECT * FROM produto WHERE nome ILIKE  $1 AND cod_mercado = $2 LIMIT 30",
            [search, id]
        );
        return response;
    },
    async edit(id, form) {
        const response = await db.query(
            "UPDATE produto SET nome=$1, descricao=$2, preco=$3, url_img=$4, estoque=$5, preco_lista=$6 WHERE id_produto = $7",
            [form.nome, form.descricao, form.preco, form.url_img, form.estoque, form.preco_lista, id]
        );

        const produto = await this.select(id);

        return produto.rows[0];
    },
    async delete(id) {
        const response = await db.query(
            "DELETE FROM produto WHERE id_produto = $1",
            [id]
        );
        return response;
    }
};