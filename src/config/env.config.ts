interface IEnv {
  BACKEND_URL: string | undefined;
  JWT_SECRET: string | undefined;
}

export const env: IEnv = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
};
