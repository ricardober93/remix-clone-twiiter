import { Link } from "@remix-run/react";
import { useUser } from "~/utils";

export default function Banner() {
  const user = useUser();
  return (
    <>
      {
        user.id === null ?
          <div className=" sm:hidden w-full absolute bottom-0 left-0 flex justify-center items-center">
            <Link to="/auth/login" className="w-1/2 bg-blue-200 text-blue-600 text-center py-3"> Login </Link>
            <Link to="/auth/register" className="w-1/2 bg-blue-600 text-blue-200 text-center py-3"> register </Link>
          </div>
          : null
      }
    </>

  )
}