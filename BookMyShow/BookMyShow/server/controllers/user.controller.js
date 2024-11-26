import User from "../Modal/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetail = await User.findById(userId);
    res.status(200).send(userDetail);
  } catch (e) {
    console.log("error ar get UserID contoller", e);
  }
};

export const createUser = async (req, res) => {
  console.log(process.env.jwt_secret_salt,"consoel.------")
  try {
    const userData = req.body;
    const newUserData = await User.create(userData);
    res.status(200).send(newUserData);
  } catch (e) {
    console.log("error at create User", e);
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newUserData = req.body;
    const userData = await User.updateOne(
      { _id: userId },
      { $set: newUserData }
    );
    res.status(200).send(userData);
  } catch (e) {
    console.log("error in updating data", e);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newUserData = await User.findByIdAndDelete(userId);
    res.status(200).send(newUserData);
  } catch (e) {
    console.log("error at delete the user", e);
  }
};

export const login = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email }).select(
      "password email isadmin"
    );
    console.log(user, userData);
    if (user) {
      const isValidPassoword = await bcrypt.compare(
        userData.password,
        user.password
      );
      console.log(userData,user,"user----------")
      console.log(process.env.jwt_secret_salt,"jwttoken--on-login----")
      if (isValidPassoword) {
        const jwtToken = jwt.sign(
          {
            email: user.email,
            id:user._id,
            isadmin:user.isadmin,
          },
          process.env.jwt_secret_salt,
          { expiresIn: "2d" }
        );
        console.log(jwtToken,"JwtToken-login------")
        res.setHeader("jwtToken", jwtToken);
        return res.status(200).send({
          status: true,
          Message: "Login sucessfull",
        });
      } else {
        return res.status(401).send({
          status: false,
          Message: "Email or Password is incorrect",
        });
      }
    } else {
      res.status(401).send({
        status: false,
        Message: "Email or Password is incorrect",
      });
    }
  } catch (e) {
    console.log("Error in Login", e);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const jwtToken = req.get("jwttoken");
    console.log(req.headers, "jwtTOken------");
    const userData = jwt.verify(jwtToken, process.env.jwt_secret_salt);
    if (userData) {
      console.log(userData);
      const userInfo = await User.findOne({ email: userData.email });
      res.status(200).send({ status: true, ...userInfo });
    } else {
      res.status(400).send({ status: false, Message: "please Login" });
    }
    res.send({ jwtToken });
  } catch (e) {
    console.log("Error in getUserDEtials", e);
  }
};
