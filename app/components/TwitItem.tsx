export const TwitItem = ({ twit }: { twit: any }) => {
  return (
    <div className={"my-2 flex gap-3"}>
      <img
        className="h-10 w-10 rounded-full bg-cover object-cover"
        src={
          twit.user.photoUser
            ? twit.user.photoUser
            : "https://placehold.co/100x100"
        }
        alt={twit.user.name}
      />
      <section className={"grid gap-3"}>
        <div className="flex items-end gap-3">
          <h2 className="font-medium text-gray-600">{twit.user.name}</h2>
          <p className={"text-sm text-gray-400"}> {twit.createdAt} </p>
        </div>
        <p className="ml-3">{twit.body}</p>
      </section>
    </div>
  );
};
