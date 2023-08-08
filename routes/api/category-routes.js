const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
});

res.status(200).json(categories);
} catch (err) {
  res.status(500).json(err);
}
});

// Get route by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Category POST route
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route for category update
router.put('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId) || categoryId <= 0) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const [updatedRowsCount] = await Category.update(
      { category_name: req.body.category_name },
      {
        where: { id: categoryId },
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updatedCategory = await Category.findByPk(categoryId);

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error while updating the category' });
  }
});

// DELETE by id route
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategoryCount = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedCategoryCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
