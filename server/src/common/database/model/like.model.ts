import { Base } from "./base.model";

export interface Like extends Base {
  liked_by?: string;
  liked_post?: string;
  liked_comment?: string;
}
