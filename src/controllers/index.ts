import { NextFunction, Request, Response } from "express";
import { IAccount } from "../models";
import Repository from "../models/accountModel";

import Auth from "../auth";

async function getAccounts(req: Request, res: Response, next: NextFunction) {
  const accounts = await Repository.findAll();
  res.json(
    accounts.map((item) => {
      item.password = "";
      return item;
    })
  );
}

async function getAccountById(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) throw new Error("Type error: ID is from type int");

    const account = await Repository.findById(id);

    if (account === null) {
      return res.status(404).end();
    } else {
      account.password = "";
      return res.status(200).json(account);
    }
  } catch (err) {
    res.status(400).end();
  }
}

async function addAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const newAccount = req.body as IAccount;
    newAccount.password = Auth.hashPassword(newAccount.password);

    const result = await Repository.add(newAccount);
    newAccount.password = "";
    newAccount.id = result.id;

    res.status(201).json(result);
  } catch (err) {
    res.status(400).end();
  }
}

async function setAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    if (!id) throw new Error("Type error: ID is from type int");

    const accountParams = req.body as IAccount;
    const updatedAccount = await Repository.set(id, accountParams);

    updatedAccount.password = "";
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(400).end();
  }
}

export default {
  getAccounts,
  getAccountById,
  addAccount,
  setAccount,
};
