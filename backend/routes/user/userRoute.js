import { Router } from 'express';
import userController from '../../controller/userController.js'

const {getAllUsersController, getUserActivitiesController, getUserByEmailController, getUserByIdController, updateUserInfoController} = userController

const userRoute = Router();
userRoute.route('/all').get(getAllUsersController);
userRoute.route('/activities').get(getUserActivitiesController)
userRoute.route('/user-email').get(getUserByIdController)
userRoute.route('/user-id').get(getUserByEmailController)
userRoute.route('update-user-info').post(updateUserInfoController)

export default userRoute;