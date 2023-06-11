import { Base } from "./base.model";

export interface User extends Base {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  phone?: number;
  verify_token?: string;
  verify_token_active?: number;
  reset_token?: string;
  reset_token_active?: number;
  is_active?: boolean;
  is_verified?: boolean;
  role?: string;
}
