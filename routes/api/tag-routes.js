const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// find all tags
router.get("/", async (req, res) => {
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

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
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

// create a new tag
router.post("/", async (req, res) => {
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

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag) {
      res.status(404).json({
        message: `No tag found with id: ${req.params.id}. ID not found.`,
      });
    }
    res.status(200).json(updateTag);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({
        message: `No tag found with id: ${req.params.id}. ID not found.`,
      });
    }
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
