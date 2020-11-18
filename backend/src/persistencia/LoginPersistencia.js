const db = require("../configs/database");

module.exports = {
    async cadastrarUsuario(form, callback) {
        const response = await db.query(
            "INSERT INTO usuario (nome, sobrenome, data_nascimento, cpf, celular) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario",
            [form.nome, form.sobrenome, form.data_nascimento, form.cpf, form.celular]
        );

        if (response.rowCount == 1) {
            const dadosUsuario = await db.query(
                    "INSERT INTO login (email, senha, cod_usuario) VALUES ($1, $2, $3)",
                    [form.email, form.senha, response.rows[0].id_usuario]
            );
            
        }

        return response;
    },
    async verficarCpf(cpf) {
        const response = await db.query(
            "SELECT id_usuario FROM usuario WHERE cpf = $1",
            [cpf]
        );
        return response;
    },
    async verficarEmail(email) {
        const response = await db.query(
            "SELECT id_login FROM login WHERE email = $1",
            [email]
        );
        return response;
    },
    async login(form, callback){
        const response = await db.query(
            "SELECT * FROM login INNER JOIN usuario ON cod_usuario = id_usuario WHERE email = $1",
            [form.email]
        );
        return response;
    },
    async delete(id){
        const response = await db.query(
            "DELETE FROM usuario WHERE id_usuario = $1",
            [id]
        );
        return response;
    }
};