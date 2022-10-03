import {Role} from "./role";

export interface UserToken {
  id: number;
  username: string;
  // token:string;
  roles: Role[];
}
