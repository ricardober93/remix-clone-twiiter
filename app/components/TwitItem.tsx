

export const TwitItem =  ({ twit }: { twit: any } )  => {
  return (
    <div className={"grid gap-3 my-2"}>
      <div className="flex items-end gap-3">
        <h2 className="font-medium text-gray-600">{twit.user.name}</h2>
        <p className={"text-sm text-gray-400"}> {twit.createdAt} </p>
      </div>
      <p className="ml-3">{twit.body}</p>
    </div>
  )
}