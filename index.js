const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.send({ response: "Hi Acid Labs" }).status(200);
});
module.exports = router;