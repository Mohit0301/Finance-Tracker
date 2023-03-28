const express = require("express");
const router = express.Router();
const {
    getAllInvestments,
    getInvestment,
    createInvestment,
    updateInvestment,
    deleteInvestment
} = require("../controllers/investments");

router.route("/").get(getAllInvestments).post(createInvestment);
router.route("/:id").get(getInvestment).patch(updateInvestment).delete(deleteInvestment);

module.exports = router;