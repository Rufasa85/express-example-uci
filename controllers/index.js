const express = require('express');
const router = express.Router();

const htmlRoutes = require("./htmlRoutes");
router.use(htmlRoutes);

const petRoutes = require("./petRoutes");
router.use("/api/pets",petRoutes);

module.exports = router;