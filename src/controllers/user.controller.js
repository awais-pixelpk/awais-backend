import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req, res) => {
  // get user details for frontend
  // validation - not empty
  //check if user already exist or not : username/emails
  //check for images : check avatar
  //upload them to cloudinary , avatar
  //create user object -- create entery in db
  //remove password and refresh token from field
  // check for user creation
  // return res

  const { fullname, username, email, password } = req.body;
  //console.log("email", email);

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or name already exist");
  }
  const avatarLocalPath = req.files?.avatar[0].path;
  //const coverImageLocalPath = req.files?.coverImage[0].path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar field is required");
  }
  const avatar = await uploadOncloudinary(avatarLocalPath);
  const coverImage = await uploadOncloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar field is required");
  }
  const createdUser = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  /*const createdUser = await User.findById(User._id).select(
    "-password -refreshToken"
  );*/

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  const {
    password: _,
    refreshToken: __,
    ...userDetails
  } = createdUser.toObject();
  return res
    .status(201)
    .json(new ApiResponse(200, userDetails, "user register successfully"));
});

export { registerUser };
