import {model, Schema } from "mongoose";

const userScehma = new Schema({
name:{ type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
},
phone:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
    minLength:[3,'Min 3 chars'],
    maxLength:[10,'Max 10 chars']
},
});

userScehma.pre('save',function(next){
    console.log(this,"thisss")
    this.password= this.password+"--encrypted";
    next();
});
userScehma.post('save', function(doc){
    console.log(this,"thisss");
    this.password= this.password+"--encrypted";
    console.log(doc,"thisis doc-------")

})
const User = model('user', userScehma);

export default User;