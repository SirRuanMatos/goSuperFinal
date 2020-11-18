const db = require("../configs/database");

module.exports = {
    async avaliationChecker(id) {
        const response = await db.query(
            "SELECT id_pedido, cod_mercado, cod_usuario FROM pedido WHERE cod_usuario = $1 AND status = 'Entregue' AND avaliado = 'false' ",
            [id]
        );
        return response;
    },
    async avaliationDone(id) {
        const response = await db.query(
            "UPDATE pedido SET avaliado = 'true' WHERE id_pedido = $1",
            [id]
        );
        return response;
    },
    async vote(avaliacao) {
        const response = await db.query(
            "INSERT INTO avaliar(avaliacao, cod_mercado, cod_usuario, cod_pedido) VALUES ($1, $2, $3, $4)",
            [avaliacao.avaliacao, avaliacao.cod_mercado, avaliacao.cod_usuario, avaliacao.cod_pedido]
        );
        this.avaliationDone(avaliacao.cod_pedido);
        return response;
    },
};