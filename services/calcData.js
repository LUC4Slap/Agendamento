const { format } = require("date-fns");
class calcData {
  calcularDiasRestantes(obj) {
    const data1 = new Date(obj.vencimento);
    const data2 = new Date(obj.previsao);
    const diff = Math.abs(data1 - data2);
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias;
  }

  formatData(data) {
    let date = data;
    let novaData = date.split("-").reverse().join("/");
    return novaData;
  }
}

module.exports = new calcData();
