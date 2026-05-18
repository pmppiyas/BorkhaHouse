import AdminMainPageWrapper from '@/app/components/admin/main/AdminMainPageWrapper';
import { Suspense } from 'react';

const page = () => {
  return <Suspense fallback={<p>Loading</p>}>
           <AdminMainPageWrapper/>
       </Suspense>;
};

export default page;
