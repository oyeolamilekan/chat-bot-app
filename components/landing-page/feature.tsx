import Image from "next/image"

export function Feature() {
  return (
    <section className="">
      <h1 className="text-center md:text-3xl text-2xl font-semibold md:w-2/6 w-6/6 m-auto mb-5">How it works</h1>
      <div className="flex flex-col items-center my-7 p-2">
        <div className="my-5 text-center">
          <h1 className="text-2xl font-semibold">Embed blog posts from your favourite author.</h1>
          <p className="my-3">Load all your favourite blog post into one embed database.</p>
        </div>
        <Image src={'/features/img1.png'} width={850} height={850} alt="ima" className="rounded" />
      </div>
      <div className="flex flex-col items-center my-7 p-2">
        <div className="my-5 text-center">
          <h1 className="text-2xl font-semibold">Have a conversation.</h1>
          <p className="my-3">Chat with the knownledge base you downloaded, powered by chatgpt and vector search.</p>
        </div>
        <Image src={'/features/img2.png'} width={850} height={850} alt="ima" className="rounded" />
      </div>
      <div className="flex flex-col items-center my-7 p-2">
        <div className="my-5 text-center">
          <h1 className="text-2xl font-semibold">Get references to the conversation.</h1>
          <p className="my-3">Get references linked to the conversation you are having.</p>
        </div>
        <Image src={'/features/img3.png'} width={850} height={850} alt="ima" className="rounded" />
      </div>
    </section>
  )
}
