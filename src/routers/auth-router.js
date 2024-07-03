import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  userSigninSchema,
  userSignupSchema,
} from '../validation/userSchema.js';
import {
  signinController,
  signupController,
} from '../controllers/auth-controllers.js';

const authRouter = Router();
authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);
authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);
export default authRouter;
