import { User } from "./User";

export interface Profile {
  user: User;
  permissions: number[];
  navbar: any;
}
