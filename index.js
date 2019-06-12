const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send({ response: "Hi Acid Labs, I'm Alicia, I hope you enjoy my app, I made it with love :) " }).status(200);
});

module.exports = router;