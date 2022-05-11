var PhotoModel = require('../models/photoModel.js');
var decay = require('decay')
/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
            .populate('postedBy').sort({ timeCreated: -1 })
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                for (var i = photos.length - 1; i >= 0; i--) {
                    if (photos[i].reports.length > 2) {
                        photos.splice(i, 1)

                    }
                }
                var data = [];
                data.photos = photos;
                //return res.render('photo/list', data);
                return res.json(photos);
            });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }).populate('postedBy').populate({
            path: 'comments',
            populate: {
                path: 'postedBy',
                model: 'user'
            },
            options: { sort: { 'timeCreated': 'descending' } }
        })
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }

                return res.json(photo);
            });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
            name: req.body.name,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            views: 0,
            likes: [],
            comments: [],
            timeCreated: Date.now(),
            tags: req.body.tags.split(/,/),
            reports: [],
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
            photo.path = req.body.path ? req.body.path : photo.path;
            photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
            photo.views = req.body.views ? req.body.views : photo.views;
            photo.likes = req.body.likes ? req.body.likes : photo.likes;
            photo.timeCreated = req.body.timeCreated ? req.body.timeCreated : photo.timeCreated;
            photo.reports = req.body.reports ? req.body.reports : photo.reports;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function (req, res) {
        return res.render('photo/publish');
    },

    like: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            if (photo.likes.indexOf(req.session.userId) != -1) {
                photo.likes.splice(photo.likes.indexOf(req.session.user), 1)
            } else {
                photo.likes.push(req.session.userId);

            }

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },
    search: function (req, res) {
        var tag = req.body.search;

        PhotoModel.find({ tags: { $regex: tag } }).populate('postedBy')
            .sort({ timeCreated: -1 }).exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photos.',
                        error: err
                    });
                }
                /*var data = [];
                data.photos = photos;
                data.searchParams = tag;*/
                return res.json(photos);
            });
    },

    report: function (req, res) {
        var id = req.params.id;
        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.reports.push(req.session.userId)

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },
    decay: function (req, res) {
        console.log("decay")
        PhotoModel.find()
            .populate('postedBy').sort({ timeCreated: -1 })
            .exec(function (err, photos) {
                if (err) {
                    return res.status(501).json({
                        message: 'Error when getting photo -decay.',
                        error: err
                    });
                }
                for (var i = photos.length - 1; i >= 0; i--) {
                    if (photos[i].reports.length > 2) {
                        photos.splice(i, 1)

                    }
                }
                var hackerHotScore = decay.hackerHot();
                photos.forEach(photo => {
                    photo.score = hackerHotScore(photo.likes.length, photo.timeCreated);
                })
                photos.sort(function (first, second) {
                    if (first.score > second.score)
                        return -1
                    if (first.score < second.score)
                        return 1
                    return 0
                })
                var data = [];
                data.photos = photos;
                //return res.render('photo/list', data);
                return res.json(photos);
            });
    }



};
