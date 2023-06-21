const router  = require('express').Router();

let router_name = "notes";

const {
    add,
    getAll,
    getById,
    updateById,
    deleteById
} = require(`../controllers/${router_name}.controller`);

router.post('/add', add);
router.get('/all', getAll);
router.get('/get_by_id/:id', getById);
router.put('/update/:_id', updateById);
router.delete('/delete/:_id', deleteById);


module.exports = router;