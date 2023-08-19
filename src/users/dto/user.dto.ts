import { Role } from "../../roles/roles.model";

export class UserDto {
  username: string;
  email: string;
  id: number;
  isActivated: boolean;
  roles: Role[];

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.roles = model.roles;
  }
}
