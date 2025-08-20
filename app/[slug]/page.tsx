import { notFound } from "next/navigation";
import { pages } from "../lib/data/slugArray";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);

  const page = pages.find((p) => p.slug === slug);

  if (!page) return notFound();

  console.log(page);

  return (
    <>
      <h2 className="text-xl font-bold">{page.title}</h2>
      <div>{page.content}</div>
      </>
  );
}
