import { Link, NavLink } from "@remix-run/react";
import { Home, Search, User as UserIcon } from "react-feather";
import { useUser } from "~/utils";

export const Sidebar = () => {
  const user = useUser();
  return (
    <>
      {
        user.id === null ?
          (<nav className="flex flex-col items-center gap-3 px-3 pt-6 lg:w-1/5">
            <NavLink
              to={"/"}
              className={({ isActive}) =>
                isActive ? "flex  gap-2 justify-center items-center bg-gray-200 px-4 py-3 rounded-3xl font-bold"
                  : "flex gap-2 justify-center items-center hover:bg-gray-200 px-4 py-3 hover:rounded-3xl "}>
              <Home strokeWidth={2.5} size={32} />
              <h2 className={"hidden lg:block  flex-1"}> Inicio </h2>
            </NavLink>
            <NavLink  to={"/explore"}
            className={({ isActive}) =>
              isActive ? "flex  gap-2 justify-center items-center bg-gray-200 px-4 py-3 rounded-3xl font-bold"
                : "flex gap-2 justify-center items-center px-4 py-3"}>
              <Search strokeWidth={2.5} size={32} /> </NavLink>
          </nav>) :
          <nav className="flex flex-col items-center gap-4 px-3 pt-6 lg:w-1/5">
            <NavLink to={"/"}
             className={({ isActive}) =>
               isActive ? "flex  gap-2 justify-center items-center bg-gray-200 px-4 py-3 rounded-3xl font-bold"
                 : "flex gap-2 justify-center items-center hover:bg-gray-200 px-4 py-3 hover:rounded-3xl "}>
              <Home strokeWidth={2} size={28} />
              <h2 className={"hidden lg:block flex-1 text-xl font-regular"}> Inicio </h2>
            </NavLink>
            <NavLink to={"/profile"}
              className={({ isActive}) =>
               isActive ? "flex  gap-2 justify-center items-center bg-gray-200 px-4 py-3 rounded-3xl font-bold"
                 : "flex gap-2 justify-center items-center hover:bg-gray-200 px-4 py-3 hover:rounded-3xl "}>
              <UserIcon strokeWidth={2} size={28} />
              <h2 className={"hidden lg:block flex-1 text-xl font-regular"}> Perfil </h2></NavLink>
          </nav>
      }
    </>
  );
};