class AppointmentFactory {
  Build(simpleAppointment) {
    let day = simpleAppointment.competencia.getDate() + 1;
    let month = simpleAppointment.competencia.getMonth();
    let year = simpleAppointment.competencia.getFullYear();

    let startDate = new Date(year, month, day);
    // startDate.setHours(startDate.getHours() - 4);

    let appo = {
      id: simpleAppointment._id,
      title: `${simpleAppointment.obrigacao}`,
      start: startDate,
      end: startDate,
    };
    return appo;
  }
}

module.exports = new AppointmentFactory();
