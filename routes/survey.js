const { Router } = require("express");
const { rank, getSummary } = require("../controllers/survey");

const surveyRouter = Router();

surveyRouter.post("/", async (req, res) => {
  let { ranking } = req.body;
  let s = await rank(ranking);
  if (s.error) {
    res.status(500).send(s);
  } else {
    res.send(s);
  }
});

surveyRouter.get("/summary", async (req, res) => {
  let summary = await getSummary();
  res.send(summary);
});

module.exports = {
  surveyRouter,
};
