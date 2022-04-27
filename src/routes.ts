import { Router, Request, Response } from "express";
import AccountsController from "./controllers";
import { AccountSchema } from "./models";

export const endpoints = {
  base: "/accounts",
};

// const validateAccount = (req: Request, res: Response, next: any) => {
//   const { error } = AccountSchema.validate(req.body);
//   if (error === null) return next();

//   const { details } = error;
//   const message = details
//     .map((item: { message: String }) => item.message)
//     .join(",");

//   console.log(message);
//   res.status(422).end(); //unproccessable entity
// };

const router = Router();

router.get(endpoints.base, AccountsController.getAccounts);
router.get(endpoints.base, AccountsController.getAccountById);
// router.post(endpoints.base, validateAccount, AccountsController.addAccount);
router.post(endpoints.base, AccountsController.addAccount);

export default router;
