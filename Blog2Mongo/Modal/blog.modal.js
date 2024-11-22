import {model, Schema} from 'mongoose';

const blogSchema = new Schema({
    title:{
        type:String,
        required:[true],
        trim:true,

    },
    author:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
});

const Blog = model('blog', blogSchema);

export default Blog;