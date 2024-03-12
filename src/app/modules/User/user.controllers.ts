import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

// user register
const userRegister = catchAsync(async (req, res) => {
  const userData = req.body;
  const createdUser = await userServices.registerUserIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Registerd Successfully!",
    data: createdUser,
  });
});

// user login
const userLogin = catchAsync(async (req, res) => {
  const userData = req.body;
  const loggedUserWithToken = await userServices.loginUser(userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "login Successfully!",
    data: loggedUserWithToken,
  });
});
// get me
const getMe = catchAsync(async (req, res) => {
  const { deviceInfo } = req.body;
  const { phone } = (req as any).user;

  const getUser = await userServices.getMeFromDB(deviceInfo, phone);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user retrive Successfully!",
    data: getUser,
  });
});
// get me
const getSingleUserById = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const { phone, role } = (req as any).user;

  const getUser = await userServices.getSingleUserFromDB(userId, phone, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user retrive Successfully!",
    data: getUser,
  });
});
// get me
const updateSingleUserById = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const decodedData = (req as any).user;
  const userData = req.body;

  const getUser = await userServices.updateSingleUserFromDB(
    userId,
    decodedData,
    userData,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "user update Successfully!",
    data: getUser,
  });
});
// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const getUser = await userServices.getAllUserFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "users retrive Successfully!",
    data: getUser,
  });
});
// delete all users login
const deleteAllUsersLogin = catchAsync(async (req, res) => {
  const getUser = await userServices.deleteAllUsersLoginFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "all user device logout Successfully!",
    data: getUser,
  });
});

// get me
const deleteSingleUserById = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const getUser = await userServices.deleteSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "user Deleted Successfully!",
    data: getUser,
  });
});
//
export const userControllers = {
  userRegister,
  userLogin,
  getMe,
  getSingleUserById,
  updateSingleUserById,
  getAllUsers,
  deleteSingleUserById,
  deleteAllUsersLogin,
};
