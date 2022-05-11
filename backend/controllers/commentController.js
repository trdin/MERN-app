var CommentModel = require('../models/commentModel.js');
const photoModel = require('../models/photoModel.js');
var PhotoModel = require('../models/photoModel.js');

/**
 * commentController.js
 *
 * @description :: Server-side logic for managing comments.
 */
module.exports = {

    /**
     * commentController.list()
     */
    list: function (req, res) {
        CommentModel.find(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            return res.json(comments);
        });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({ _id: id }, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.create()
     */
    create: function (req, res) {
        var comment = new CommentModel({
            content: req.body.content,
            timeCreated: Date.now(),
            postedBy: req.session.userId,
            photo: req.body.photo
        });

        comment.save(function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            PhotoModel.findOne({ _id: comment.photo }, function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting answer',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: "photo not found"
                    });
                }

                photo.comments.push(comment.id);

                photo.save(function (err, photo) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating answer.',
                            error: err
                        });
                    }
                    CommentModel.findOne({ _id: comment.id }).populate('postedBy').exec(function (err, comment) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when getting answer',
                                error: err
                            });
                        }

                        return res.status(201).json(comment);
                    })

                });
            });

        });
    },

    /**
     * commentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({ _id: id }, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            comment.content = req.body.content ? req.body.content : comment.content;
            comment.timeCreated = req.body.timeCreated ? req.body.timeCreated : comment.timeCreated;
            comment.postedBy = req.body.postedBy ? req.body.postedBy : comment.postedBy;
            comment.photo = req.body.photo ? req.body.photo : comment.photo;

            comment.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comment.',
                        error: err
                    });
                }

                return res.json(comment);
            });
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
