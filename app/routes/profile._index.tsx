import { NavLink, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getTwitsById } from "~/models/twit.server";
import { TwitItem } from "~/components/TwitItem";
import UserInfo from "~/components/UserInfo";
import { getUser } from "~/models/user.server";
import { ArrowDownLeft, ArrowLeft } from "react-feather";

export const meta: V2_MetaFunction = () => [{ title: "Profile Twits" }];

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const listTwits = await getTwitsById(userId);
  const userInfo = await getUser({ userId });
  return json({ listTwits, userInfo });
};
export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();
  return (
    <section className={"flex w-full flex-col"}>
      <div className={"flex gap-5 py-5"}>
        <NavLink to={"/"} className="text-gray-900 underline">
          <ArrowLeft />
        </NavLink>
        <h3 className="font-bold">Perfil</h3>
      </div>
      <UserInfo user={data?.userInfo} />
      {data.listTwits.length > 0 ? (
        data.listTwits.map((twit) => <TwitItem key={twit.id} twit={twit} />)
      ) : (
        <div>No hay twits</div>
      )}
    </section>
  );
}
