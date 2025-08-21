import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Recipes",
  description: "A collection of delicious recipes",
};
export default function AboutPage() {
  return (
    <>
      <div>About</div>
      <ul className="flex gap-1 flex-wrap bg-purple-600 text-white px-2 py-0.5 skew-x-[-20deg]">
        <li className="skew-x-[20deg] text-sm">Fantasy</li>
      </ul>

      <ul className="flex gap-1 flex-wrap list-none m-0 p-0">
  <li>
    <button
      type="button"
      className="bg-purple-600 text-white px-2 py-0.5 text-sm skew-x-[-20deg] hover:skew-x-[20deg] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
      aria-label="Fantasy genre badge"
    >
      <span className="inline-block skew-x-[20deg] hover:skew-x-[-20deg]">
        Fantasy
      </span>
    </button>
  </li>
</ul>

<ul className="flex gap-1 flex-wrap list-none m-0 p-0">
  <li>
    <span
      className="inline-block bg-purple-600 text-white px-2 py-0.5 text-sm skew-x-[20deg] hover:skew-x-[-20deg] transition-transform duration-300 rounded shadow"
      aria-label="Fantasy genre badge"
    >
      Fantasy
    </span>
  </li>
</ul>

<span className="inline-block skew-x-[20deg] hover:skew-x-[-20deg] transition-transform duration-300 bg-purple-600 text-white px-2 py-0.5 text-sm rounded shadow">
  <span className="inline-block skew-x-[-20deg] hover:skew-x-[20deg]">
    Fantasy
  </span>
</span>
    </>
  )
}