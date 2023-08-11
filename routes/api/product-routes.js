const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: [
        'id',
        'product_name',
        "brand_name",
        "price",
        "stock",
        "category_id"
      ],
      include: [{
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
      }
      ]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a product
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    brand_name: req.body.brand_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id
  })
    .then((newProduct) => {
      res.json(newProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE product by id
router.put('/:id', (req, res) => {
  Product.update(
    {
      product_name: req.body.product_name,
      brand_name: req.body.brand_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => res.json(err));
});
  
  // DELETE route for a product by id
  router.delete('/:id', (req, res) => {
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedProduct) => {
        res.json(deletedProduct);
      })
      .catch((err) => res.json(err));
  });

  module.exports = router;
