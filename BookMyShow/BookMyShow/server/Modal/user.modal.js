import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userScehma = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [3, "Min 3 chars"],
      maxLength: [10, "Max 10 chars"],
      select: false,
    },
    isadmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userScehma.pre("save", async function (next) {
  console.log(this, "thisss--usermodal");
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  this.password = hashedPassword;
  next();
});
// userScehma.post('save', function(doc){
//     console.log(this,"thisss");
//     this.password= this.password+"--encrypted";
//     console.log(doc,"thisis doc-------")

// })
const User = model("users", userScehma);

export default User;


