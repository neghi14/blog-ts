import { Base } from "./base.model";

export interface Comment extends Base {
  author?: string;
  body?: string;
  article?: string;
  replied_to?: string;
  is_deleted?: boolean;
  restricted?: boolean;
}
