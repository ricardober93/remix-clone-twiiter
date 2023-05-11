import { Link } from "@remix-run/react";
import { useUser } from "~/utils";

export default function Banner() {
  const user = useUser();
  return (
    <>
      {
        user.id === null ?
          <div className="absolute bottom-0 left-0 flex w-full items-center justify-center sm:hidden">
            <Link to="/auth/login" className="w-1/2 bg-blue-200 py-3 text-center text-blue-600"> Login </Link>
            <Link to="/auth/register" className="w-1/2 bg-blue-600 py-3 text-center text-blue-200"> register </Link>
          </div>
          : null
      }
    </>

  )
}