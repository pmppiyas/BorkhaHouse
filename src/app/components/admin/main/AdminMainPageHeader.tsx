"use client"

import ReusableHeader from '@/app/components/shared/ReuseableHeader';
import { CalendarArrowUp, Package , Plus} from 'lucide-react';
import { useRouter } from 'next/navigation';


const AdminMainPageHeader = () => {

  const navigate = useRouter();

  return (
    <ReusableHeader
    icon={<Package className="h-5 w-5" />}
    title="Our Dashboard"
    description="Welcome back, Admin 👋"
     actions={[
          {
            label: 'Add Product',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate.push("/admin/product/add"),
       },
       {
            label: 'View Order',
            icon: <CalendarArrowUp className="h-4 w-4" />,
            onClick: () => navigate.push("/admin/product/add"),
       },
        ]}
    />

  );
};

export default AdminMainPageHeader;
