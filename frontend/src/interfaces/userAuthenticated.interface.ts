export interface IUser {
  user: User;
}

interface User {
  id: string;
  name: string;
  iat: number;
  exp: number;
}
