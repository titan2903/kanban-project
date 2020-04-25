const { Task, User } = require('../models');


class Tasks {
    static getTasks(req, res) {
        Task.findAll({
            include: User,
            order: [
                ['id', 'ASC']
            ]
        })
            .then((tasks) => {
                res.status(200).json({ tasks })
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }

    static getOneTask(req, res) {
        const id = req.params.id
        Task.findOne({
            where: { id: id }
        })
            .then((task) => {
                if (task) {
                    res.status(200).json({ task })
                } else {
                    res.status(404).json({
                        message: `${task} not found`
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }

    static createTask(req, res) {
        const { title, description, category } = req.body
        Task.create({
            title,
            description,
            category,
            UserId: req.userdata.id
        })
            .then((tasks) => {
                // console.log(tasks, 'result from create')
                res.status(200).json({ tasks })
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }

    static deleteTask(req, res) {
        let id = req.params.id
        let taskDeleted;

        Task.findOne({ where: { id: id } })
            .then((task) => {
                if (task) {
                    taskDeleted = task
                    return Task.destroy({
                        where: { id: id }
                    })
                } else {
                    res.status(404).json({
                        message: `Task not found`
                    })
                }
            })
            .then(() => {
                res.status(200).json({
                    taskDeleted,
                    message: `Data id: ${id} has been deleted`
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }

    static updateTask(req, res) {
        let id = req.params.id
        Task.update(req.body, {
            where: { id: id }
        })
            .then((result) => {
                res.status(200).json({
                    message: `Data id: ${id} has been Updated`
                })
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server ${err}`
                })
            });
    }
}

module.exports = Tasks
