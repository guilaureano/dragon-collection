export interface IDragon {
  createdAt: string;
  name: string;
  type: string;
  histories: string;
  id: string;
}

export interface IDragonList {
  data: Array<IDragon>;
  hasError: boolean;
  loading: boolean;
}
