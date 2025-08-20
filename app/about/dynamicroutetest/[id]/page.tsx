import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read route params
  const { id } = await params;


  return {
    title: "Test av dynamic route",
    description: "Detta är en test av en dynamisk rutt",
  };
}

export default async function DynamicRouteTest({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Vi fick anrop med id:{id}</h1>
}
