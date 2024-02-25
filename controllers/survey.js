const { model } = require("../models/survey");

async function rank(ranking) {
  try {
    let saved = await model.create(ranking);
    return saved;
  } catch (err) {
    if (err.code == 11000) {
      return { error: true, message: "The code has already been used!" };
    } else {
      console.log(err);
      return { error: true, message: "Something went wrong!" };
    }
  }
}

async function getSummary() {
  try {
    let pipeline = [
      {
        $group: {
          _id: "$rank",
          total: {
            $count: {},
          },
        },
      },
    ];

    let summary = await model.aggregate(pipeline);
    return summary;
  } catch (err) {}
}

module.exports = {
  rank,
  getSummary,
};
