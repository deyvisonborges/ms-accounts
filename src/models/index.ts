import Joi from "joi";
import { join } from "path";
import { AccountStatus } from "./accounts-status";
export interface IAccount {
  id?: number;
  name: string;
  email: string;
  password: string;
  status: AccountStatus;
  domain: string;
}

const AccountSchema = Joi.object({
  id: Joi.number().integer().min(1),
  name: Joi.string().alphanum().min(3).max(150).required(),
  email: Joi.string().email().min(8).max(50).required(),
  password: Joi.string().min(6).max(50),
  status: Joi.number().integer().min(100).max(400),
  domain: Joi.string().min(5).max(150),
});

export { AccountSchema };
