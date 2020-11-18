const CupomDao = require("../persistencia/CupomPersistencia");
const crypto = require("crypto");

module.exports = {
  async createPromotion(req, resp) {
    const id_usuario = req.body.id_usuario;

    var cupon = crypto.createHash('md5').update(process.env.CUPONS_TOKEN + id_usuario).digest("hex");
    try {
      const cc = await CupomDao.createCupom(cupon, id_usuario);
  
      resp.status(200).send([{cupom: cupon}]);
      
    } catch (error) {
      resp.status(500).send(error);
    }
  },
  async searchPromotion(req, resp){
    const id_usuario = req.params.id_usuario;
    try {
      const cc = await CupomDao.searchCupom(id_usuario);
  
      resp.status(200).send(cc);
      
    } catch (error) {
      resp.status(500).send(error);
    }
  },
  async checkPromotion(req, resp){
    const coupon = req.body.coupon;
    try {
      const cc = await CupomDao.checkPromotion(coupon);
      
      if(cc.length>0){
        resp.status(200).send({status: "Ok"});
      }else{
        resp.status(404).send({status: "Not found"});
      }
      
    } catch (error) {
      resp.status(500).send(error);
    }
  }
};