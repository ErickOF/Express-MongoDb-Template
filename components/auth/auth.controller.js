const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./auth.dao');

const SECRET_KEY = 'secretkey123456';


/**
 * Create new user function
 */
exports.createUser = (req, res) => {
    const newUser = {
        idCard: req.body.idCard,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        startDate: req.body.startDate,
        createdBy: req.body.createdBy,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephoneNumber: req.body.telephoneNumber,
        email: req.body.email,
        idRol: req.body.idRol
    }

    User.findOne({
        username: newUser.username
    }, (err, user) => {
        if (err) {
            return res.status(500).send(
                {
                    error: true,
                    message: 'Server error',
                    data: null
                }
            );
        }

        if (user) {
            return res.send(
                {
                    error: true,
                    message: 'Username already exists.',
                    data: null
                }
            );
        } else {
            User.create(newUser, (err, user) => {
                if (err) {
                    return res.status(500).send(
                        {
                            error: true,
                            message: 'Server error',
                            data: null
                        }
                    );
                }

                const expiresIn = 24 * 60 * 60;

                const accessToken = jwt.sign({
                    id: user.id
                },
                    SECRET_KEY, {
                    expiresIn: expiresIn
                });

                res.send(
                    {
                        error: false,
                        message: 'Success',
                        data: null
                    }
                );
            });
        }
    });
}

/**
 * Delete user
 */
exports.delete = (req, res) => {
    const _id = req.body._id;

    User.deleteOne({
        "_id": _id
    }, (err, response) => {
            if (err) {
                return res.status(500).send(
                    {
                        error: true,
                        message: 'Server error',
                        data: null
                    }
                );
            } else {
                res.send(
                    {
                        error: false,
                        message: 'User was deleted.',
                        data: response
                    }
                );
            }
    });
}

/**
 * Login user
 */
exports.loginUser = (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    }

    User.findOne({
        username: userData.username
    }, (err, user) => {
        if (err) {
            return res.status(500).send(
                {
                    error: true,
                    message: 'Server error',
                    data: null
                }
            );
        }

        if (!user) {
            res.send(
                {
                    error: true,
                    message: 'Invalid user.',
                    data: null
                }
            );
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);

            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({
                    id: user.id
                }, SECRET_KEY, {
                    expiresIn: expiresIn
                });

                res.send(
                    {
                        error: false,
                        message: 'Success',
                        data: {
                            idCard: req.body.idCard,
                            username: req.body.username,
                            password: bcrypt.hashSync(req.body.password),
                            startDate: req.body.startDate,
                            createdBy: req.body.createdBy,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            telephoneNumber: req.body.telephoneNumber,
                            email: req.body.email,
                            idRol: req.body.idRol,
                            accessToken: accessToken,
                            expiresIn: expiresIn
                        }
                    }
                );
            } else {
                res.send(
                    {
                        error: true,
                        message: 'Invalid password!',
                        data: null
                    }
                );
            }
        }
    });
}

/**
 * Get all users
 */
exports.getAll = (req, res) => {
    User.find({}, {
        idCard: 1,
        username: 1,
        email: 1,
        startDate: 1,
        createdBy: 1,
        firstname: 1,
        lastname: 1,
        telephoneNumber: 1,
        idRol: 1
    }, (err, users) => {
        if (err) {
            return res.status(500).send(
                {
                    error: true,
                    message: 'Server error',
                    data: null
                }
            );
        }
        return res.send(
            {
                error: false,
                message: 'Success',
                data: users
            }
        );
    });
}

/**
 * Update user
 */
exports.update = (req, res) => {
    const userData = {
        idCard: req.body.idCard,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephoneNumber: req.body.telephoneNumber,
        email: req.body.email,
        idRol: req.body.idRol
    };

    User.updateOne({
        _id: req.body._id
    }, {
        $set: userData
    }, (err, users) => {
        if (err) {
            return res.status(500).send(
                {
                    error: true,
                    message: 'Server error',
                    data: null
                }
            );
        }
        return res.send(
            {
                error: false,
                message: 'Success',
                data: users
            }
        );
    });
}
