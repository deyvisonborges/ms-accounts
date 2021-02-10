import { NextFunction, Request, Response } from "express";
import { IAccount } from "../models";

const accounts: IAccount[] = [];

function getAccounts(req: Request, res: Response, next: NextFunction) {
  res.json(accounts);
}

function getAccountById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const index = accounts.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).end();
    } else {
      return res.status(200).json(accounts[index]);
    }
  } catch (err) {
    res.status(400).end();
  }
}

function addAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const newAccount = req.body as IAccount;
    accounts.push(newAccount);
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).end();
  }
}

export default {
  getAccounts,
  getAccountById,
  addAccount,
};
