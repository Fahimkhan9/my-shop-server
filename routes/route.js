const { Router } = require("express");
const {
  home_get,
  get_product_by_category,
} = require("../controllers/controller");

const router = Router();

router.get("/", home_get);
router.get("/getproductbycategory/:category", get_product_by_category);

module.exports = router;
