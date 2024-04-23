import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center my-5">One pricing.</h1>
      <div className="bg-white p-5 rounded max-w-[460px] m-auto">
        <h3 className="text-xl font-semibold mb-3">All in</h3>
        <h1 className="text-3xl font-bold mb-3">$50</h1>
        <ol>
          <li className="flex items-center gap-1"><Check className="text-green-500"/> Chat with blog posts</li>
          <li className="flex items-center gap-1"><Check className="text-green-500"/> Organize conversation by posts.</li>
          <li className="flex items-center gap-1"><Check className="text-green-500"/> Easy installation</li>
          <li className="flex items-center gap-1"><Check className="text-green-500"/> Lifetime updates</li>
          <li className="flex items-center gap-1"><Check className="text-green-500"/> Unlimited chats</li>
        </ol>
      </div>
    </>
  )
}
