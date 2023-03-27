const {
  createQuestion,
  getQuestion,
  getSellerQuestions,
  getCustomerQuestions,
  getOfferQuestions,
  setAnswer,
  deleteQuestion,
} = require("../controllers/questionsControllers.js");

module.exports = {
  postQuestionsHandler: async (req, res) => {
    const { question, customerId } = req.body;
    const { offerId } = req.params;
    const offertype = req.path.split("/")[1];
    try {
      if (!question) throw new Error("Question content missing");
      if (!customerId) throw new Error("Customer unknown");
      if (!offerId) throw new Error("Question unrelated to an offer");
      if (offertype === "service" || offertype === "product") {
        console.log("Creating Question -(at Handler)-");
        const quest = await createQuestion({
          offertype,
          question,
          customerId,
          offerId,
        });
        console.log(quest);
        res.status(201).json(quest);
      } else {
        throw new Error("Offer type is not specified correctly");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  setAnswerHandler: async (req, res) => {
    const offertype = req.path.split("/")[1];
    const { answer } = req.body;
    const { questId } = req.params;
    try {
      if (!answer) throw new Error("Answer content missing");
      if (!questId) throw new Error("Missing question reference");
      if (offertype === "service" || offertype === "product") {
        console.log("answering prod quest handler");
        const quest = await setAnswer({ offertype, questId, answer });
        res.status(201).json(quest);
      } else {
        throw new Error("Offer type is not specified correctly");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getQuestionsHandler: async (req, res) => {
    const offertype = req.path.split("/")[1];
    const { offerId } = req.body;
    const { questId } = req.query;
    try {
      console.log("Handling getter");
      if (questId) {
        const quest = await getQuestion({ offertype, questId });
        res.status(200).json(quest);
      }
      if (offerId) {
        const quest = await getOfferQuestions({ offertype, offerId });
        res.status(200).json(quest);
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
};
