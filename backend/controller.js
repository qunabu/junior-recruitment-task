const Task = require('./task');

exports.findAll = (req, res) => {
    Task.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.create = (req, res) => {

    if (!req.params.content || req.params.content.length < 3) {
        return res.status(400).send({
            err: "Task content cannot be empty and must have at least 3 chars."
        });
    }
    const task = new Task({
        content: req.params.content,
        finished: false
    });
    task.save()
        .then(task => {
            res.send(task);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send({message: "Task deleted successfully!", newTask: task});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Absence status to modify task. BODY: " + req.body.finished
        });
    }
    Task.findOneAndUpdate({_id: req.params.taskId}, {
        finished: req.body.finished
    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });
        }
        res.send(task);
        return task;
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.taskId
        });
    });
};