import { Base } from "./base.model";

export interface Comment extends Base {
  author?: string;
  body?: string;
  post?: string;
  restricted?: true | false;
}
