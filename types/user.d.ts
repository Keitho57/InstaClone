export type UserInfo = {
  email: string;
  password: string;
  name?: string;
};

export type UserAction = {
  type: string;
  currentUser: DocumentData;
};

export type DispatchType = (args: UserAction) => UserAction;
