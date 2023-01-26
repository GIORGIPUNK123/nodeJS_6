// api/ products
// api/ users
const router = require("express").Router();

const productRoutes = require("./modules/products/productRoutes");
const userRoutes = require("./modules/users/userRoutes");

// api/ products /
router.use("/products", productRoutes);
// api/ users /
router.use("/users", userRoutes);

// TODO:
module.exports = router;
