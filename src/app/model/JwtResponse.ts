export class JwtResponse{
  public id: number;
  public token: string;
  public name: string;
  public roles: any;
  public users: any;

  constructor(id: number, token: string, name: string, roles: any) {
    this.id = id;
    this.token = token;
    this.name = name;
    this.roles = roles;
  }
}
