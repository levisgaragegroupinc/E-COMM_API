const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const findAllTags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    if (!findAllTags) {
      res.status(404).json({ message: "No tags found." });
      return;
    }
    res.status(200).json(findAllTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findOneTag = await Tag.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    if (!findOneTag) {
      res.status(404).json({
        message: `No tag found with id: ${req.params.id}. ID not found.`,
      });
    }
    res.status(200).json(findOneTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const createNewTag = await Tag.create(req.body, {
      tag_name: req.body.tag_name,
    });
    if (!createNewTag) {
      res.status(404).json({
        message: "Unable to create new tag.",
      });
    }
    res.status(200).json(createNewTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
