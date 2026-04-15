import { IUser } from '@/interface/user.interface';
import { serverFetch } from '@/utils/serverFetch';

export const signUp = async (payload: IUser) => {
  try {
    const res = await serverFetch.post('user/signup', payload);

    const result = await res.json();

    console.log(result);

    return result;
  } catch (err) {
    return err instanceof Error ? err.message : 'Internal Server Error';
  }
};
