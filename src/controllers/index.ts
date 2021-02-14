import { NextFunction, Request, Response } from "express";
import { IAccount } from "../models";
import AccountRepository, { AccountModel } from "../models/accountModel";

const accounts: IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: NextFunction) {
  const accounts = await AccountRepository.findAll<AccountModel>();
  res.json(
    accounts.map((item) => {
      item.password = "";
      return item;
    })
  );
}

function getAccountById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (!id) throw new Error("Type error: ID is from type int");

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
