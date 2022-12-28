declare namespace Express {
  export interface IAuthor {
    id: string;
    name: string;
  }

  export interface Request {
    author: IAuthor;
  }
}
