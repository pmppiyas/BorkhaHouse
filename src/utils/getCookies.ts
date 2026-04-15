'use server';

import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  const cookieStore = cookies();

  return (await cookieStore).get(name)?.value;
};

export default getCookie;
