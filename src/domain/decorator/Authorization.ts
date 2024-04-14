export interface AuthorizantionDecorator {
  execute(): Promise<Output>;
}

type Output = {
  authorized: boolean;
  data: string;
};
