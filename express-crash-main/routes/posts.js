import express from "express";
const router = express.Router();



let posts = [
    {id: 1, title: "post one"},
    {id: 2, title: "post two"},
    {id: 3, title: "post three"}
];


router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)

    if(!isNaN(limit) && limit >0){
        res.json(posts.slice(0, limit))
    } else{
        res.json(posts);
    }


})

//Get a single post

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.json(posts.filter((post) => post.id === id));
})


//create new post
router.post('/', (req, res) =>{
    console.log('Request body:', req.body);

    if (!req.body || !req.body.title) {
        return res.status(400).json({msg: 'Please include a title'})
    }

    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    posts.push(newPost)

    res.status(201).json(posts)
})

// Update Post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({msg: `A post with the id of ${id} was not found`})
    }

    post.title = req.body.title;
    res.status(200).json(posts);
})

// Delete Post
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({msg: `A post with the id of ${id} was not found`})
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
})

export default router;



