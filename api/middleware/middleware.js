function logger(req, res, next) {
    // DO YOUR MAGIC
    console.log(req);
    console.log(
        `Request: ${req.method}, url: ${req.url}, timestamp: ${new Date().toISOString()}`
    )
}

const USER = require('../users/users-model');

function validateUserId(req, res, next) {
    // DO YOUR MAGIC
    const id = req.params.id;
    USER.getById(id)
        .then(person => {
            if (person) {
                console.log(`found ${person} by id`)
                req.user = person
                next();
            } else {
                next({ status: 404, message: 'user not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Something went wrong' })
        })
}

function validateUser(req, res, next) {
    // DO YOUR MAGIC
    const { name } = req.body;
    try {
        if (!name) {
            res.status(400).json({ message: 'missing user data' })
        } else {
            next();
        }
    } catch (error) {
        res.status(400).json({ message: 'missing required name field' })
    }
}

function validatePost(req, res, next) {
    // DO YOUR MAGIC
    const { postMessage } = req.body;
    try {
        if (!postMessage) {
            res.status(400).json({ message: 'missing post data' })
        } else {
            next();
        }
    } catch {
        res.status(400).json({ message: 'missing required text field' })
    }

}

// do not forget to expose these functions to other modules
module.exports = {
    logger,
    validateUser,
    validateUserId,
    validatePost
}