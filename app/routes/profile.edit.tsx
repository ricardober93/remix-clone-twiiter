import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ActionArgs,
  json,
  LoaderArgs,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { uploadImageToCloudinary } from "~/utils/utils.server";
import { editUserInfo, getUser } from "~/models/user.server";
import invariant from "tiny-invariant";
import { getNote } from "~/models/note.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      if (name !== "photoUser" && name !== "backgroundUser") {
        return undefined;
      }
      const uploadedImage = await uploadImageToCloudinary(data);
      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const name = formData.get("name");
  const username = formData.get("username");

  const photoUser = formData.get("photoUser");
  const backgroundUser = formData.get("backgroundUser");
  const descriptionUser = formData.get("descriptionUser");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { body: null, title: "name is required" } },
      { status: 400 }
    );
  }
  if (typeof username !== "string" || username.length === 0) {
    return json(
      { errors: { body: null, title: "username is required" } },
      { status: 400 }
    );
  }

  if (typeof username !== "string" || username.length === 0) {
    return json(
      { errors: { body: null, title: "username is required" } },
      { status: 400 }
    );
  }

  if (typeof photoUser !== "string") {
    return json(
      { errors: { body: null, title: "username is required" } },
      { status: 400 }
    );
  }

  const note = await editUserInfo({
    id: userId,
    name,
    username,
    photoUser,
    backgroundUser,
    descriptionUser,
  });

  return redirect(`/profile`);
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);

  const user = await getUser({ userId });
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user });
};

export default function FormDialogUpdateUserInfo() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const photoUserRef = useRef<HTMLInputElement>(null);
  const backgroundUserRef = useRef<HTMLInputElement>(null);
  const descriptionUserRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(actionData);
    if (actionData?.errors?.body) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <section className="h-full w-full px-4 py-6 ">
      <Form
        method="post"
        encType="multipart/form-data"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        <section className="my-10">
          <div className={"flex h-40 flex-col items-end justify-end gap-3"}>
            <img
              className={"h-20 w-full bg-cover object-cover"}
              src={
                data?.user?.backgroundUser
                  ? data?.user?.backgroundUser
                  : "https://placehold.co/600x400"
              }
              alt="cover_info"
            />

            <label
              htmlFor={"backgroundUser"}
              className={
                "cursor-pointer appearance-none rounded-md bg-gray-200 p-3 text-gray-700 transition hover:bg-gray-300 focus:outline-none"
              }
            >
              <span className="text-gray-700">Choose a file</span>
              <input
                type="file"
                id={"backgroundUser"}
                accept="image/*"
                className={"sr-only"}
                name={"backgroundUser"}
                ref={backgroundUserRef}
              />
            </label>
          </div>

          <div
            className={
              "relative -mt-28 h-20 w-40 cursor-pointer rounded-full  transition hover:border-gray-400 focus:outline-none"
            }
          >
            <img
              className={"my-3 h-20 w-20 rounded-full bg-cover object-cover"}
              src={
                data?.user?.photoUser
                  ? data?.user?.photoUser
                  : "https://placehold.co/600x400"
              }
              alt="cover_info"
            />
            <label
              className={
                "cursor-pointer appearance-none rounded-md bg-gray-200 p-3 text-gray-700 transition hover:bg-gray-300 focus:outline-none"
              }
              htmlFor={"photoUser"}
            >
              <span className="text-sm text-gray-700">Choose a file</span>
              <input
                className={"sr-only"}
                type="file"
                id={"photoUser"}
                name={"photoUser"}
                ref={photoUserRef}
              />
            </label>
          </div>
        </section>

        <div>
          <label className="mt-10 flex w-full flex-col gap-1">
            <span className={"text-sm"}>Nombre</span>
            <input
              ref={nameRef}
              name="name"
              placeholder="nombre"
              className="flex-1 rounded-md border-2 border-gray-500 px-3 text-sm leading-loose"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.body ? (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.body}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span className={"text-sm"}>Username </span>
            <input
              ref={usernameRef}
              name="username"
              placeholder="username"
              className="flex-1 rounded-md border-2 border-gray-500 px-3 text-sm leading-loose"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.body ? (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.body}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span className={"text-sm"}>Description </span>
            <textarea
              ref={descriptionUserRef}
              name="descriptionUser"
              placeholder="breve description"
              className="flex-1 rounded-md border-2 border-gray-500 px-3 text-sm leading-loose"
              aria-invalid={actionData?.errors?.body ? true : undefined}
              aria-errormessage={
                actionData?.errors?.body ? "title-error" : undefined
              }
            />
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        >
          Guardar
        </button>
      </Form>
    </section>
  );
}
