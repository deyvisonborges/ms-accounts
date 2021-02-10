import { Router, Request, Response } from "express";
import { endpoints } from "./endpoints";
import AccountsController from "../controllers";

const router = Router();

router.get(endpoints.base, AccountsController.getAccounts);
router.get(endpoints.base, AccountsController.getAccountById);
router.post(endpoints.base, AccountsController.addAccount);

export default router;
