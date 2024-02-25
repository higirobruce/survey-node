const mongoose = require("mongoose");
const SurveySchema = mongoose.Schema(
  {
    rank: {
      type: String,
    },
    code: {
      type: Number,
      unique: true,
      dropDups: true,
    },
    device: {},
  },

  { timestamps: true }
);

module.exports = {
  model: mongoose.model("rankings", SurveySchema),
  schema: SurveySchema,
};
