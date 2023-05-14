import { Link, NavLink } from "@remix-run/react";
import { Home, Search, User as UserIcon, PlusCircle } from "react-feather";
import { useUser } from "~/utils";

export const Sidebar = () => {
  const user = useUser();
  return (
    <>
      {user.id === null ? (
        <nav className="flex flex-col items-center gap-3 px-3 pt-6 lg:w-1/5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "flex  items-center justify-center gap-2 rounded-3xl bg-gray-200 px-4 py-3 font-bold"
                : "flex items-center justify-center gap-2 px-4 py-3 hover:rounded-3xl hover:bg-gray-200 "
            }
          >
            <Home strokeWidth={2.5} size={32} />
            <h2 className={"hidden flex-1  lg:block"}> Inicio </h2>
          </NavLink>
          <NavLink
            to={"/explore"}
            className={({ isActive }) =>
              isActive
                ? "flex  items-center justify-center gap-2 rounded-3xl bg-gray-200 px-4 py-3 font-bold"
                : "flex items-center justify-center gap-2 px-4 py-3"
            }
          >
            <Search strokeWidth={2.5} size={32} />{" "}
          </NavLink>
        </nav>
      ) : (
        <nav className="flex flex-col items-center gap-4 px-3 pt-6 lg:w-1/5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "flex  items-center justify-center gap-2 rounded-3xl bg-gray-200 px-4 py-3 font-bold"
                : "flex items-center justify-center gap-2 px-4 py-3 hover:rounded-3xl hover:bg-gray-200 "
            }
          >
            <Home strokeWidth={2} size={28} />
            <h2 className={"font-regular hidden flex-1 text-xl lg:block"}>
              {" "}
              Inicio{" "}
            </h2>
          </NavLink>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              isActive
                ? "flex  items-center justify-center gap-2 rounded-3xl bg-gray-200 px-4 py-3 font-bold"
                : "flex items-center justify-center gap-2 px-4 py-3 hover:rounded-3xl hover:bg-gray-200 "
            }
          >
            <UserIcon strokeWidth={2} size={28} />
            <h2 className={"font-regular hidden flex-1 text-xl lg:block"}>
              {" "}
              Perfil{" "}
            </h2>
          </NavLink>
          <NavLink
            to={"/twit/new"}
            className={({ isActive }) =>
              isActive
                ? "flex  items-center justify-center gap-2 rounded-3xl bg-gray-200 px-4 py-3 font-bold"
                : "flex items-center justify-center gap-2 px-4 py-3 hover:rounded-3xl hover:bg-gray-200 "
            }
          >
            <PlusCircle strokeWidth={2} size={28} />
            <h2 className={"font-regular hidden flex-1 text-xl lg:block"}>
              {" "}
              Nuevo Twit{" "}
            </h2>
          </NavLink>
        </nav>
      )}
    </>
  );
};
