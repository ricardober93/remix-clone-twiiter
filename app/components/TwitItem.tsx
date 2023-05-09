

export const TwitItem =  ({ twit }: { twit: any } )  => {
  return (
    <div className={"grid gap-3 my-2"}>
      <div className="flex gap-3 items-end">
        <h2 className="text-gray-600 font-medium">{twit.user.name}</h2>
        <p className={"text-sm text-gray-400"}> {twit.createdAt} </p>
      </div>
      <p className="ml-3">{twit.body}</p>
    </div>
  )
}