const appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const AppointmentFactory = require("../factories/AppointmentFactory");
const Appo = mongoose.model("Appointment", appointment);

class AppointmentService {
  async Create(obrigacao, competencia, vencimento, previsao) {
    let newAppo = new Appo({
      obrigacao,
      competencia,
      vencimento,
      previsao,
      finished: false,
    });
    try {
      await newAppo.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async GetAll(showFinished) {
    if (showFinished) {
      return await Appo.find();
    } else {
      try {
        let appos = await Appo.find({ finished: false });
        let appointments = [];
        appos.forEach((appointment) => {
          if (appointment.competencia != undefined) {
            appointments.push(AppointmentFactory.Build(appointment));
          }
        });
        return appointments;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }

  async GetById(id) {
    try {
      let event = await Appo.findById(`${id}`);
      // let event = await Appo.findOne({ _id: new mongoose.Types.ObjectId(id) });
      return event;
    } catch (err) {
      console.log(err);
      return { message: "Erro" };
    }
  }

  async FinishedTarefa(id) {
    try {
      let resp = await Appo.findByIdAndUpdate(id, { finished: true });
      console.log("ID: ", id);
      return resp;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new AppointmentService();
