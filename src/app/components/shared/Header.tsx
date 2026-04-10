const Header = ({ title }: { title: string }) => {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-medium md:text-3xl">{title}</h2>
      <hr className="border-t-2 border-primary" />
    </div>
  );
};

export default Header;
