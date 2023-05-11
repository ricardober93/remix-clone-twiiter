import type { V2_MetaFunction } from "@remix-run/node";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTwits } from "~/models/twit.server";
import { Sidebar } from "~/components/sidebar";
import Banner from "~/components/banner";
import { TwitItem } from "~/components/TwitItem";

export const meta: V2_MetaFunction = () => [{ title: "Remix Twits" }];

export const loader = async ({ request }: LoaderArgs) => {
  const twitsListItems = await getTwits();
  return json({ twitsListItems });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
        <div className="flex-1 p-2 lg:w-4/5">
          <h1 className="text-lg font-bold"> Inicio </h1>
          <section className={"grid gap-4 p-6"}>
            {
              data.twitsListItems.length > 0 ?
              data.twitsListItems.map((twit) => (
                <TwitItem key={twit.id} twit={twit} />
              )) : <p> No hay Twits Disponibles </p>
            }
          </section>
        </div>
  );
}
