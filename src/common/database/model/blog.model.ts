import { Base } from "./base.model";

export interface Blog extends Base {
  author?: string;
  title?: string;
  content?: string;
}
