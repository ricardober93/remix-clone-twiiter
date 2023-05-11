export default function UserInfo() {
  return (
    <>
      <section className="relative h-1/6 w-full mb-6 ">
        <img
          className={'h-full bg-cover object-cover w-full'}
          src={'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
          alt="cover_info" />

        <img
          className={'absolute h-24 bg-cover object-cover w-24 ml-5 -mt-10 border-4 border-solid border-white rounded-full'}
          src={'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
          alt="cover_info" />
      </section>
      <section className="flex flex-col gap-3 mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">
            Ricardo Bermudez
          </h1>
          <h6 className="text-lg text-gray-400">
            @ricardob
          </h6>
        </div>
        <p>
          Bienvenido a mi página de Twittear, esta es la página principal de mia aplicación.
        </p>
      </section>
    </>
  );
}
