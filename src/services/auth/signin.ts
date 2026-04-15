import { serverFetch } from '@/utils/serverFetch';

export interface ISignIn {
  identifier: string;
  password: string;
}
export const signIn = async (payload: ISignIn) => {
  const res = await serverFetch.post('auth/signin', payload);

  const result = await res.json();

  return result;
};
