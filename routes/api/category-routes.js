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
    const findOneCategory = await Category.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    });
    if (!findOneCategory) {
      res.status(404).json({
        message: `No category found with id: ${req.params.id}. ID not found.`,
      });
    }
    res.status(200).json(findOneCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const createNewCategory = await Category.create(req.body, {
      category_name: req.body.category_name,
    });
    if (!createNewCategory) {
      res.status(404).json({
        message: "Unable to create new category.",
      });
    }
    res.status(200).json(createNewCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({
        message: `No catergory found with id: ${req.params.id}. ID not found.`,
      });
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({
        message: `No catergory found with id: ${req.params.id}. ID not found.`,
      });
    }
    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
