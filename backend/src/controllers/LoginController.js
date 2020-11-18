
const LoginDao = require("../persistencia/LoginPersistencia");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function generateToken(params = {}) {
  return jwt.sign(params, process.env.TOKEN_JWT, {
    expiresIn: 86400
  });
}

module.exports = { 
  async insert(req, resp) {
    const form = req.body;
    let crypt;

    crypt = await bcrypt.hash(process.env.SENHA_PASS+req.body.senha, 10);

    req.body.senha = crypt;

    const cpfExiste = await LoginDao.verficarCpf(form.cpf);

    if (!cpfExiste.rowCount == 1) {
      const emailExiste = await LoginDao.verficarEmail(form.email);

      if (!emailExiste.rowCount == 1) {
        const insert = await LoginDao.cadastrarUsuario(form);

        const autoLogin = await LoginDao.login(form);

        const token = await generateToken({ id_login: autoLogin.rows[0].id_login });

        autoLogin.rows[0].senha = undefined;
        autoLogin.rows[0].token = token;
        resp.status(201).send(autoLogin.rows[0]);
      }
      else {
        resp.status(412).send({
          error: "Email já cadastrado"
        });
      }
    }
    else {
      resp.status(412).send({
        error: "CPF já cadastrado"
      });
    }

  },
  async login(req, resp) {
    const form = req.body;

    const response = await LoginDao.login(form);

    if (response.rowCount == 0) {
      resp.status(401).send({ error: "Email inválido" });
    } else {

      if (!await bcrypt.compare( process.env.SENHA_PASS+form.senha, response.rows[0].senha))
        resp.status(401).send({ error: "Senha inválida" });

      const token = await generateToken({ id_login: response.rows[0].id_login });

      response.rows[0].senha = undefined;
      response.rows[0].token = token;
      resp.status(200).send(response.rows[0]);
    }
  },
  async delete(req,resp){
    const id = req.params.id;
    
    const response = await LoginDao.delete(id);

    resp.status(200).send(response);
  }


};