import { Router } from 'express';
import userController from '../../controller/userController.js'

const {getAllUsersController, getUserActivitiesController, getUserByEmailController, getUserByIdController, updateUserInfoController} = userController

const userRoute = Router();
userRoute.route('/all').get(getAllUsersController);
userRoute.route('/activities').get(getUserActivitiesController)
userRoute.route('/user-email').get(getUserByEmailController)
userRoute.route('/user-id/:userId').get(getUserByIdController)
userRoute.route('/update-user-info').post(updateUserInfoController)

export default userRoute;