const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("../models/blogSchema");

require('dotenv').config();


const dbURI= process.env.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    Blog.find()
        .then(result=>{
            console.log(result)
            res.render('index', {blogs:result});
        })
})

app.get('/create-todo', (req,res)=>{
    res.render('add-todo')
})

app.post('/add',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
        .then(result=>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
});

app.delete('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({ redirect: '/' })
    })
    .catch(err=>{
        console.log(err)
    })
})