const db = require("../configs/database");

module.exports = {
    async cadastrarEntregador(form, callback) {
        const response = await db.query(
            "INSERT INTO endereco (cep, rua, bairro, numero, complemento, cidade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_endereco",
            [form.cep, form.rua, form.bairro, form.numero, form.complemento, form.cidade]
        );

        if (response.rowCount == 1) {
            const entregador = await db.query(
                "INSERT INTO entregador (nome, sobrenome, cpf, data_nascimento, habilitacao, celular, cod_endereco) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [form.nome, form.sobrenome, form.cpf, form.data_nascimento, form.habilitacao, form.celular, response.rows[0].id_endereco]
            );
            return entregador;
        }

        return;

    },
    async selectAll() {
        const response = await db.query(
            "SELECT * FROM entregador",
            []
        );
        return response;
    },
    async select(id) {
        const response = await db.query(
            "SELECT * FROM entregador INNER JOIN endereco ON cod_endereco = id_endereco WHERE id_entregador = $1",
            [id]
        );
        return response;
    },
    async edit(id, form) {
        const response = await db.query(
            "UPDATE entregador SET nome=$1, sobrenome=$2, cpf=$3, data_nascimento=$4, habilitacao=$5, celular=$6 WHERE id_entregador = $7 RETURNING cod_endereco",
            [form.nome ,form.sobrenome ,form.cpf ,form.data_nascimento ,form.habilitacao ,form.celular ,id]
        );

        const responseEndereco = await db.query(
            "UPDATE endereco SET cep=$1, rua=$2, bairro=$3, numero=$4, complemento=$5, cidade=$6 WHERE id_endereco = $7",
            [form.cep ,form.rua ,form.bairro ,form.numero ,form.complemento ,form.cidade ,response.rows[0].cod_endereco]
        );

        const entregador = await this.select(id);

        return entregador.rows[0];
    },
    async verficarCpf(cpf) {
        const response = await db.query(
            "SELECT id_entregador FROM entregador WHERE cpf = $1",
            [cpf]
        );
        return response;
    },
    async delete(id) {
        const response = await db.query(
            "DELETE FROM entregador WHERE id_entregador = $1",
            [id]
        );
        return response;
    }
};