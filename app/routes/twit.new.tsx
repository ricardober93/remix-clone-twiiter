import { Form, useActionData } from "@remix-run/react";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { createTwit } from "~/models/twit.server";
import { useEffect, useRef } from "react";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const body = formData.get("body");

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: null, title: "body is required" } },
      { status: 400 }
    );
  }

  const note = await createTwit({ body, userId });

  return redirect(`/profile`);
};
export default function NewTwitPage() {
  const actionData = useActionData<typeof action>();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <section className={"px-3  py-10 lg:w-4/5"}>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span className={"text-xl font-bold "}>¿Qué estas Pensando? </span>
            <textarea
              ref={bodyRef}
              name="body"
              placeholder="Que estas pensando?"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.body ? true : undefined}
              aria-errormessage={
                actionData?.errors?.body ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.body ? (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.body}
            </div>
          ) : null}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded-3xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Twittear
          </button>
        </div>
      </Form>
    </section>
  );
}
