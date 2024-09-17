const express = require('express');
const USER = require('./users-model');
const POST = require('../posts/posts-model');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')
const router = express.Router();

router.get('/', async(req, res) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    try {
        const users = await USER.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Somethin went wrong' })
    }
});

router.get('/:id', validateUserId, async(req, res) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    const user = await USER.findById(req.params)
    res.status(200).json(user)
});

router.post('/', validateUser, async(req, res) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    const newUser = await USER.insert(req.body)
    res.status(200).json(newUser);
});

router.put('/:id', validateUserId, validateUser, async(req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const updateUser = req.body
    const id = req.params
    const updateOBJ = await USER.update(id, update);
    if (updateObj) {
        res.status(200).json({...updateUser, id })
    } else {
        res.status(500).json({
            message: 'cannot make this put request to update user'
        })
    }
})


router.get('/:id/posts', validateUserId, async(req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    const { id } = req.params;
    const userPost = await USER.findCommentById(id);
    res.status(200).json(userPost);
});

router.post('/:id/posts', validateUserId, validatePost, async(req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const { id } = req.params;
    const newPost = {...req.body, id: id }
    const createdPost = POST.insert(newPost)
    res.status(200).json(createdPost);
});

// do not forget to export the router

module.exports = router;