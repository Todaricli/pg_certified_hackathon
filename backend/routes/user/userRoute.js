import { Router } from 'express';
import {getAllUsersController, getUserActivitiesController, getUserByEmailController, getUserByIdController, updateUserInfoController} from '../../controller/userController'

const userRoute = Router();
userRoute.route('/all').get(getAllUsersController);
userRoute.route('/activities').get(getUserActivitiesController)
userRoute.route('/user-email').get(getUserByIdController)
userRoute.route('/user-id').get(getUserByEmailController)
userRoute.route('update-user-info').post(updateUserInfoController)

export default userRoute;