const db = require("../configs/database");

module.exports = {
    async insert(form, callback) {
        const response = await db.query(
            "INSERT INTO endereco (cep, rua, bairro, numero, complemento, cidade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_endereco",
            [form.cep, form.rua, form.bairro, form.numero, form.complemento, form.cidade]
        );

        if (response.rowCount == 1) {
            const mercado = await db.query(
                "INSERT INTO mercado (nome, url_imagem, cod_endereco) VALUES ($1, $2, $3) RETURNING id_mercado",
                [form.nome, form.url_imagem,response.rows[0].id_endereco]
            );
            return mercado;
        }

        return;

    },
    async select(id) {
        const response = await db.query(
            "SELECT * FROM mercado INNER JOIN endereco ON cod_endereco = id_endereco WHERE id_mercado = $1",
            [id]
        );
        return response;
    },
    async selectAll() {
        const response = await db.query(
            "SELECT avg(avaliacao) as avaliacao, id_mercado,nome, cod_endereco,id_endereco, url_imagem,cep, rua,bairro,numero,complemento,cidade FROM avaliar RIGHT JOIN mercado ON cod_mercado = id_mercado INNER JOIN endereco ON cod_endereco = id_endereco  GROUP BY id_mercado,nome, cod_endereco,id_endereco, url_imagem,cep, rua,bairro,numero,complemento,cidade LIMIT 30",
            []
        );
        return response;
    },
    async searchMarket(search) {
        const response = await db.query(
            "SELECT * FROM mercado INNER JOIN endereco ON cod_endereco = id_endereco WHERE nome ILIKE  $1 LIMIT 30",
            [search]
        );
        return response;
    },
    async edit(id, form) {
        const response = await db.query(
            "UPDATE mercado SET nome=$1, url_imagem=$2 WHERE id_mercado = $3 RETURNING cod_endereco",
            [form.nome, form.url_imagem, id]
        );

        const responseEndereco = await db.query(
            "UPDATE endereco SET cep=$1, rua=$2, bairro=$3, numero=$4, complemento=$5, cidade=$6 WHERE id_endereco = $7",
            [form.cep ,form.rua ,form.bairro ,form.numero ,form.complemento ,form.cidade ,response.rows[0].cod_endereco]
        );

        const mercado = await this.select(id);

        return mercado.rows[0];
    },
    async delete(id) {
        const response = await db.query(
            "DELETE FROM mercado WHERE id_mercado = $1",
            [id]
        );
        return response;
    }
};