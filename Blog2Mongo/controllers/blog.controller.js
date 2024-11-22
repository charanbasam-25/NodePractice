// here we write all the bussiness logic
import fs from 'fs';
import Blog from '../Modal/blog.modal.js';

export const getAllBlog = async (req,res)=>{
    try{
        const blogData= await Blog.find({});
        res.status(200).send(blogData);
    }
    catch(e){
        res.status(500).send(e.message);
    }
  
}

export const getBlogById = async(req,res)=>{
    try{
        const blogId= req.params.blogId;
        const blogData= await Blog.findById(blogId)
        res.status(200).send(blogData);
    }
    catch(e){
        res.status(500).send(e.message);
    }
}

export const deleteBlogById =async(req,res)=>{
    try{
        const blogId= req.params.blogId;
        const data = await Blog.findByIdAndDelete(blogId);

        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send(e.message);
    }

}

export const createBlogById =async(req,res)=>{
    try{
        let blogData = fs.readFileSync('Mocks/mock.blog.json');
        const newBlogData= req.body;
        const data= await Blog.create(newBlogData);
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send(e.message);
    }
}


export const updateBlogById = async (req,res)=>{
    try{
        const blogId= req.params.blogId;
        const newBlogData= req.body;
        const blogData = await Blog.updateOne({_id:blogId},{$set: newBlogData});
        res.status(200).send(blogData);

    }
    catch(e){
        res.status(500).send(e.message);
    }

}

export const renderBlog= async(req,res)=>{
    const blogData = await Blog.find({});
    res.render('bloglist',{blogs:blogData})
}

export const renderBlogById= async(req,res)=>{
    try{
    const blogId= req.params.blogId;
    const blogData= await Blog.findById(blogId)
    res.render('blogDetail',{blog:blogData})
    }
    catch(e){
        console.log(e, 'error in render blogId')
    }
}