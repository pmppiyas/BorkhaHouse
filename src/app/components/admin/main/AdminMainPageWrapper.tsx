import AdminMainPageContent from '@/app/components/admin/main/AdminMainPageContent';
import AdminMainPageHeader from '@/app/components/admin/main/AdminMainPageHeader';


const AdminMainPageWrapper = () => {
  return (
<div className="min-h-screen space-y-4 p-4">
      <AdminMainPageHeader/>
      <AdminMainPageContent/>
    </div>
  );
};

export default AdminMainPageWrapper;
