import User from "../models/user-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env-config.js";
import successResponse from "../lib/res/successRespones.js";
import errorResponse from "../lib/res/errorResponse.js";
import StatusCodes from "http-status-codes";
import { cookieOptions } from "../lib/constants/cookieOptions.js";

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = new User({ email, username, password });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("auth_session", token, cookieOptions);
    res.status(StatusCodes.CREATED).json(
      successResponse(
        //if you don't understand what it is then just refer what successResponse says in lib/res/successResponse.js
        true,
        "User created successfully",
        {},
        StatusCodes.CREATED
      )
    );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          false,
          error.message,
          error,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(
          errorResponse(
            false,
            "User Not found.Please Register",
            {},
            StatusCodes.NOT_FOUND
          )
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse(
            false,
            "Incorrect Password please enter correct password",
            {},
            StatusCodes.BAD_REQUEST
          )
        );
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("auth_session", token, cookieOptions);
    res
      .status(StatusCodes.ACCEPTED)
      .json(
        successResponse(
          true,
          "Successfully logged in",
          {token},
          StatusCodes.ACCEPTED
        )
      );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          false,
          error.message,
          error,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse(false, "User not found", {}, StatusCodes.BAD_REQUEST)
        );
    }
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(
          true,
          "Successfully fetched user details",
          user,
          StatusCodes.OK
        )
      );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          false,
          error.message,
          error,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
  }
};

export default {
  registerUser,
  loginUser,
  getUser,
};
