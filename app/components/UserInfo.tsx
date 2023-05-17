import { User } from "@prisma/client";
import { Link } from "@remix-run/react";

export default function UserInfo({ user }: { user: Pick<User, any> }) {
  return (
    <>
      <section className="relative mb-6 h-1/6 w-full ">
        <img
          className={"h-full w-full bg-cover object-cover"}
          src={
            user?.backgroundUser
              ? user?.backgroundUser
              : "https://placehold.co/600x400"
          }
          alt="cover_info"
        />

        <img
          className={
            "absolute -mt-10 ml-5 h-24 w-24 rounded-full border-4 border-solid border-white bg-cover object-cover"
          }
          src={
            user?.photoUser ? user?.photoUser : "https://placehold.co/300x300"
          }
          alt="cover_info"
        />
      </section>
      <section className="mt-10 flex flex-col gap-3">
        <div className="flex flex-col">
          <section className="flex w-full items-center justify-between pr-6">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <Link
              to={"/profile/edit/"}
              className="rounded-3xl border border-solid border-gray-700 px-4 py-2 font-medium text-gray-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              edit profile
            </Link>
          </section>
          <h6 className="text-lg text-gray-400">@{user?.username}</h6>
        </div>
        <p>{user?.descriptionUser}</p>
      </section>
    </>
  );
}
