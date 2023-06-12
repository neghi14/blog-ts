import { Base } from "./base.model";

export default interface List extends Base {
  author?: string;
  title?: string;
  thumbnail?: string;
  view_count?: number;
  is_deleted?: boolean;
}
