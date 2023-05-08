import { Link } from "@remix-run/react";
import { User as UserIcon, Home, Search } from 'react-feather';
import { useUser } from "~/utils";
export const Sidebar = () => {
  const user = useUser();
  return (
    <>
      {
        user.id === null ?
          (<nav className="flex flex-col gap-3 items-center px-3">
            <Link to={"/"}> <Home strokeWidth={2.5} size={32} />  </Link>
            <Link to={"/explore"}> <Search strokeWidth={2.5} size={32} />  </Link>
          </nav>) :
          <nav className="flex flex-col gap-3 items-center px-3">
            <Link to={"/"}> <Home strokeWidth={2.5} size={32} />  </Link>
            <Link to={"/profile"}> <UserIcon strokeWidth={2.5} size={32} />  </Link>
          </nav>
      }
    </>
  );
};