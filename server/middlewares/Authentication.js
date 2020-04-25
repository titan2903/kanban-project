const jwt = require('jsonwebtoken');


function authentication(req, res, next) {
    let token = req.headers.token
    try {
        let decode = jwt.verify(token, process.env.JWT_SC)
        req.userdata = decode
        next()
    } catch (error) {
        res.status(400).json({
            message: `error in authentication, result error => ${error}`
        })
    }
}

module.exports = authentication
