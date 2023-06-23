import { Base } from "./base.model";

export interface Blog extends Base {
  author?: string;
  title?: string;
  body?: string;
  slug: string;
  thumbnail?: string;
  view_count?: number;
  is_deleted?: string;
}
