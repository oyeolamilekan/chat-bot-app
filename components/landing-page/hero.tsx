import { ArrowRight, Check, FileVideo } from "lucide-react";
import { Button } from "../ui";

export function Hero() {
  return (
    <section className="flex flex-col items-center md:my-36 my-9 p-3">
      <h1 className="md:text-5xl text-3xl font-bold text-center max-w-[700px]">Have a conversation with your favourite authors.</h1>
      <ol className="my-10 space-y-2 md:text-base text-sm">
        <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Chat with multiple authors.</li>
        <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Self host your app for privacy.</li>
        <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Chat with your favourite writers.</li>
        <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Buy once own source code forever.</li>
      </ol>
      <div className="flex md:flex-row flex-col md:space-x-5 mb-5">
        <Button className="md:my-6 my-5 w-60 rounded-full p-3 space-x-12 group" variant={'dark'}>
          Buy App <ArrowRight className="ml-1 w-4 h-4 fill-primary-content group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Button>
        <Button className="md:my-6 w-60 rounded-full p-3 space-x-12 group" variant={'outline'}>
          Demo video <FileVideo className="ml-1 w-4 h-4 fill-primary-content group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Button>
      </div>
      <span className="text-orange-600 font-semibold text-center">$50 discount for the next 100 licenses.</span>
    </section>
  )
}
