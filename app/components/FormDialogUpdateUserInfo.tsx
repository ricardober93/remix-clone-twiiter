import { Fragment, useCallback, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ActionArgs,
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { editUserInfo } from "~/models/user.server";
import { Form, useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
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

  const note = await editUserInfo({
    id: userId,
    name,
    username,
    photoUser: null,
    backgroundUser: null,
    descriptionUser: null,
  });

  return redirect(`/profile`);
};
export default function FormDialogUpdateUserInfo() {
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const photoUserRef = useRef<HTMLInputElement>(null);
  const backgroundUserRef = useRef<HTMLInputElement>(null);
  const descriptionUserRef = useRef<HTMLTextAreaElement>(null);
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <Fragment>
      <button
        type="button"
        onClick={openModal}
        className="rounded-3xl border border-solid border-gray-700 px-4 py-2 font-medium text-gray-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        edit profile
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Editar Perfil
                  </Dialog.Title>
                  <div className="mt-2">
                    <Form
                      method="post"
                      encType="multipart/form-data"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor={"backgroundUser"}
                        className={
                          "h-20 w-full max-w-xl cursor-pointer appearance-none rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none"
                        }
                      >
                        <input
                          type="file"
                          id={"backgroundUser"}
                          className={"sr-only"}
                          name={"backgroundUser"}
                          ref={backgroundUserRef}
                        />
                      </label>

                      <label
                        htmlFor={"photoUser"}
                        className={
                          "relative -mt-10 h-20 w-20 cursor-pointer rounded-full border-2 border-dashed border-gray-300 bg-white transition hover:border-gray-400 focus:outline-none"
                        }
                      >
                        <input
                          className={"sr-only"}
                          type="file"
                          id={"photoUser"}
                          name={"photoUser"}
                          ref={photoUserRef}
                        />
                      </label>

                      <div>
                        <label className="flex w-full flex-col gap-1">
                          <span className={"text-sm"}>Nombre</span>
                          <input
                            ref={nameRef}
                            name="name"
                            placeholder="nombre"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-sm leading-loose"
                            aria-invalid={
                              actionData?.errors?.title ? true : undefined
                            }
                            aria-errormessage={
                              actionData?.errors?.title
                                ? "title-error"
                                : undefined
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
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-sm leading-loose"
                            aria-invalid={
                              actionData?.errors?.title ? true : undefined
                            }
                            aria-errormessage={
                              actionData?.errors?.title
                                ? "title-error"
                                : undefined
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
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-sm leading-loose"
                            aria-invalid={
                              actionData?.errors?.body ? true : undefined
                            }
                            aria-errormessage={
                              actionData?.errors?.body
                                ? "title-error"
                                : undefined
                            }
                          />
                        </label>
                      </div>
                    </Form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Guardar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}
