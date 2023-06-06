import { Base } from "./base.model";

export default interface Session extends Base {
  user?: string;
  refresh_token?: string;
  session_token?: string;
  userAgent?: string;
  user_ip?: string;
  is_valid: boolean;
}