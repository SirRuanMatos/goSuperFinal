const db = require("../configs/database");

module.exports = {
    async createCupom(cupon, id_usuario) {
        const response = await db.query(
            "INSERT INTO cupom (cod_usuario, cupom) VALUES ($1, $2)",
            [id_usuario, cupon]
        );
        return response;
    },
    async searchCupom(id_usuario) {
        const response = await db.query(
            "SELECT cupom FROM cupom WHERE cod_usuario = $1",
            [id_usuario]
        );
        return response.rows;
    },
    async checkPromotion(cupom) {
        const response = await db.query(
            "SELECT cupom FROM cupom WHERE cupom = $1",
            [cupom]
        );
        return response.rows;
    }
};