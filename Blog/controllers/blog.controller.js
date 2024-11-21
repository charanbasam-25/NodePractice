// here we write all the bussiness logic
import fs from 'fs';

export const getAllBlog =(req,res)=>{
    try{
        const blogData = fs.readFileSync('Mocks/mock.blog.json');
        res.status(200).send(JSON.parse(blogData));
    }
    catch(e){
        res.status(500).send(e.message);
    }
  
}

export const getBlogById =(req,res)=>{
    try{
        const blogData = fs.readFileSync('Mocks/mock.blog.json');
        const blogId= req.params.blogId;
        const blogDataId= JSON.parse(blogData).find(blog=>blog.id==blogId);
        console.log(blogDataId, blogId, "blog----id-----");
        res.status(200).send(blogDataId);
    }
    catch(e){
        res.status(500).send(e.message);
    }
}

export const deleteBlogById =(req,res)=>{
    try{
        const blogData = fs.readFileSync('Mocks/mock.blog.json');
        const blogId= req.params.blogId;
        const blogDataId= JSON.parse(blogData).filter(blog=>blog.id!=blogId);
        fs.writeFileSync('Mocks/mock.blog.json',JSON.stringify(blogDataId));
        res.status(200).send("Blog is Deleted");
    }
    catch(e){
        res.status(500).send(e.message);
    }

}

export const createBlogById =(req,res)=>{
    try{
        let blogData = fs.readFileSync('Mocks/mock.blog.json');
        const newBlogData= req.body;
        console.log(newBlogData);
        const blogDataId= JSON.parse(blogData).findIndex(blog=>blog.id!=blogId);
        blogData={...blogData, ...newBlogData}
        res.status(200).send("Blog is created sucessfully");
    }
    catch(e){
        res.status(500).send(e.message);
    }
}


export const updateBlogById =(req,res)=>{
    try{
        const blogId= req.params.blogId;
        const newBlogData= req.body;
        let blogData = fs.readFileSync('Mocks/mock.blog.json');
        const blogDataId= JSON.parse(blogData).findIndex(blog=>blog.id!=blogId);
        blogData[blogDataId]= {...blogData[blogDataId],...newBlogData};
        fs.writeFileSync('Mocks/mock.blog.json',JSON.stringify(blogData));
        res.status(200).send("Blog is Updated sucessfully");
    }
    catch(e){
        res.status(500).send(e.message);
    }

}