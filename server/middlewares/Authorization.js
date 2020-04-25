const { Task } = require('../models');

function authorization(req, res, next) {
    const id = req.params.id
    Task.findOne({
        where: { id: id }
    })
        .then((result) => {
            if (result) {
                if (result) {
                    // console.log(result.UserId, '<<<<userid')
                    // console.log(req.userdata.id, '<<<<<<userdataID');
                    next()
                } else {
                    res.status(400).json({
                        message: 'bad request in authorization'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'result not found'
                })
            }
        }).catch((error) => {
            res.status(400).json({
                message: `error in authorization, result error => ${error}`
            })
        });
}

module.exports = authorization
