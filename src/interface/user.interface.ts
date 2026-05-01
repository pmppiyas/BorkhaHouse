export enum Role {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
}

export interface ILocation {
  address: string;
}

export enum IStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPEND = 'SUSPEND',
}

export interface IUser {
  _id?: string;
  name: string;
  email?: string;
  number?: string;
  profileImage: string;
  location?: ILocation[];
  role: Role;
  status: IStatus;
  password: string;
}

export type IRole = 'ADMIN' | 'BUYER';
