var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController.js');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

/*
 * GET
 */
router.get('/', requiresLogin, commentController.list);

/*
 * GET
 */
router.get('/:id', commentController.show);

/*
 * POST
 */
router.post('/', requiresLogin, commentController.create);

/*
 * PUT
 */
router.put('/:id', commentController.update);

/*
 * DELETE
 */
router.delete('/:id', commentController.remove);

module.exports = router;
