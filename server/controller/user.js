const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('375846271616-962o6ik61tufclplt3ot9babp5jchrr1.apps.googleusercontent.com');
require('dotenv').config()

class Users {

    static register(req, res) {
        if (req.body.organization === null || req.body.organization === '' || req.body.organization === undefined) {
            req.body.organization = 'Hacktiv8'
        }
        User.findOne({
            where: {
                [Op.or]: [{ email: req.body.email }]
            }
        })
            .then((data) => {
                if (data) {
                    res.status.json({
                        message: `email has been created`
                    })
                } else {
                    return User.create(req.body)
                }
            })
            .then((user) => {
                res.status(200).json({ user })
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }

    static login(req, res) {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = jwt.sign({ id: user.id, email: user.email, organization: user.organization }, process.env.JWT_SC)

                        res.status(200).json({ token: token })
                    } else {
                        res.status(400).json({
                            message: 'password wrong!'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'email not found!'
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }

    static googleSingIn(req, res) {
        let token = req.body.token
        const user = {}
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then((result) => {
                const payload = result.getPayload()
                user.email = payload.email
                user.password = 'pass123word'
                user.organization = 'Hacktiv8'
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            }).then((datauser) => {
                if (datauser) {
                    return datauser
                } else {
                    return User.create(user)
                }
            }).then((newUser) => {
                const userObj = {
                    id: newUser.id,
                    email: newUser.email,
                    organization: newUser.organization
                }
                res.status(200).json({
                    access_token: jwt.sign(userObj, process.env.GOOGLE_CLIENT_ID)
                })
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }
}

module.exports = Users
