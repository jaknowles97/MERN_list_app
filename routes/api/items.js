const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// GET api/items (gets all items)
router.get('/', (req, res) => {
    Item.find()
      .sort({ date: -1})
      .then(items => res.json(items));
});

// POST api/items (create items)
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// DELTE api/items/:id (deletes SPECIFIC item)
router.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(() => res.json({sucess: true}))
      .catch(err => res.status(404).json({ success: false}));
});

module.exports = router;