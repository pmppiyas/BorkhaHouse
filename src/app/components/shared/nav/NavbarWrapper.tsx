import Navbar from '@/app/components/shared/Navbar';
import { getAllCategories } from '@/services/category/getAllCategories';

const NavbarWrapper = async () => {
  const categories = await getAllCategories();
  return (
    <div>
      <Navbar categories={categories} />
    </div>
  );
};

export default NavbarWrapper;
