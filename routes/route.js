const { Router } = require("express");
const {
  home_get,
  get_product_by_category,
  handle_payment,
} = require("../controllers/controller");

const router = Router();

router.get("/", home_get);
router.get("/getproductbycategory/:category", get_product_by_category);
router.post("/payment",handle_payment)

module.exports = router;
