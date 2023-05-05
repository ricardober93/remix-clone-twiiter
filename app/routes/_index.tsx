import type { V2_MetaFunction } from "@remix-run/node";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import { getTwits } from "~/models/twit.server";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async ({ request }: LoaderArgs) => {
  const twitsListItems = await getTwits();
  return json({ twitsListItems });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      {
        data.twitsListItems?.length === 0 ? (
          <p className="p-4">No notes yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            { data.twitsListItems?.map((twit) => (
              <div key={twit.id}>{twit.id} - {twit.body}</div>

            )) }
          </div>
        )
      }
    </main>
  );
}
