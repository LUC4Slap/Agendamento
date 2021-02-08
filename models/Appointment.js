const mongoose = require("mongoose");

// const appointment = new mongoose.Schema({
//   name: String,
//   email: String,
//   cpf: String,
//   description: String,
//   date: Date,
//   time: String,
//   finished: Boolean,
// });

const appointment = new mongoose.Schema({
  obrigacao: String,
  competencia: Date,
  vencimento: String,
  previsao: String,
  diasParaVnecer: Number,
  finished: Boolean,
});

module.exports = appointment;
