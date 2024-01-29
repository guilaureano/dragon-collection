export interface IUser {
  email?: string;
  token?: string;
}

export interface IContext extends IUser {
  handleLogout: () => void;
  handleSignin: (email: string, password: string) => Promise<void | string>;
  handleSignup: (email: string, password: string) => Promise<void | string>;
}

export interface IAuthProvider {
  children: JSX.Element;
}
