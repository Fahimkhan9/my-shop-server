const Product = require("../models/products");

module.exports.home_get = (req, res) => {
  res.send("up and running");
};
module.exports.get_product_by_category = (req, res) => {
  const { category } = req.params;
  Product.find({ category: category })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
