const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");
const calc = require("./services/calcData");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

mongoose.connect("mongodb://172.17.0.2:27017/agendamento", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/cadastro", (req, res) => {
  res.render("create");
});

app.post("/consulta", async (req, res) => {
  try {
    let { obrigacao, competencia, vencimento, previsao } = req.body;
    if (
      obrigacao == "" &&
      competencia == "" &&
      vencimento == "" &&
      previsao == ""
    ) {
      res.send("Preencha o Formulario");
      return;
    }
    let status = await appointmentService.Create(
      obrigacao,
      competencia,
      vencimento,
      previsao
    );
    if (status) {
      res.redirect("/");
    } else {
      res.json({ message: "Erro" });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.get("/getCalendar", async (req, res) => {
  try {
    let appointments = await appointmentService.GetAll(false);
    res.json(appointments);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.get("/event/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let tarefa = await appointmentService.GetById(id);
    let days = await calc.calcularDiasRestantes(tarefa);
    let tarefaFormatada = {
      id,
      obrigacao: tarefa.obrigacao,
      competencia: tarefa.competencia,
      vencimento: tarefa.vencimento,
      previsao: tarefa.previsao,
      finished: tarefa.finished,
    };
    res.render("events", { tarefa: tarefaFormatada, venceEm: days });
    // res.render("events", { tarefa });
  } catch (error) {
    console.log("/event/:id" + error);
    throw error;
  }
});

app.post("/finished", async (req, res) => {
  try {
    let { id } = req.body;
    console.log(id);
    await appointmentService.FinishedTarefa(id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.listen(8080, () => console.log("Servidor ON!"));
