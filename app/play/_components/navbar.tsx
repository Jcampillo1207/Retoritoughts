export const NavBar = ({ data }: { data: any }) => {
  return (
    <header className="w-full h-fit items-center justify-between">
      {data.user.email}
    </header>
  );
};
