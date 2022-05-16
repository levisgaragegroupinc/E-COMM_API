// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: "tag_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

// ### Associations
// REFERENCE https://sequelize.org/docs/v6/core-concepts/assocs/#:~:text=To%20do%20this%2C%20Sequelize%20provides,The%20HasMany%20association

// You'll need to execute association methods on your Sequelize models to
// create the following relationships between them:

// `Product` belongs to `Category`, and `Category` has many `Product` models,
// as a category can have multiple products but a product can only belong to one category.

// `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models.
// Allow products to have multiple tags and tags to have many products by using the `ProductTag`
// through model.

// > **Hint:** Make sure you set up foreign key relationships that match the column we created
// in the respective models.
