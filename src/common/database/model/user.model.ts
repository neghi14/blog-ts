import { Base } from "./base.model";

export interface User extends Base {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: number;
  is_active?: boolean;
}
