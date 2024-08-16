export interface IUser {
    id?: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    picture?: string;
    cover?: string;
    followers?: IUser[];
    following?: IUser[];
    isPrivate?: number;
  }
  
  export interface IResponse {
    status: string;
    message?: string;
    user?: IUser;
    payload?: unknown;
  }
  
  export type PartialUser = Partial<IUser>;
  
  export interface IContext {
    account: IUser;
    posts:IUser,
    setPosts:(obj: IUser) => void;
    setAccount: (obj: IUser) => void;
  }
  
  export interface IPost {
    id: number;
    title: string;
    picture: string;
    likes: IUser[];
  }