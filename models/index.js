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

// // Products belongsToMany Tags (through ProductTag)
// Product.belongsToMany(Tag, {
//   foreignKey: "tag_id",
// });

// Products belongsToMany Tags (through ProductTag): Alternative
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
});

// // Tags belongsToMany Products (through ProductTag)
// Tag.belongsToMany(Product, {
//   foreignKey: "tag_id",
// });

// Tags belongToMany Products (through ProductTag): Alternative
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
