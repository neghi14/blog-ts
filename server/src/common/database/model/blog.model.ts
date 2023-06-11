import { Base } from "./base.model";

export interface Blog extends Base {
  author?: string;
  title?: string;
  body?: string;
  thumbnail?: string;
  sub_title?: string;
  view_count?: number;
  is_deleted?: string;
}
