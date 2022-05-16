const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const findAllCategories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    });
    if (!findAllCategories) {
      res.status(404).json({ message: "No categories found." });
      return;
    }
    res.status(200).json(findAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findOneCategory = await Product.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    });
    if (!findOneCategory) {
      res
        .status(404)
        .json({
          message: `No category found with id: ${req.params.id}. ID not found.`,
        });
    }
    res.status(200).json(findOneProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
