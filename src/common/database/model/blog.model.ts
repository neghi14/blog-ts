import { Base } from "./base.model";

export interface Blog extends Base {
  author?: string;
  title?: string;
  slug?: string;
  content?: string;
}
