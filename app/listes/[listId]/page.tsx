import Home from "../../page";
import { publicListIds, type PublicListId } from "../../catalogue";
import { notFound } from "next/navigation";

export default async function PublicListPage({ params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params;
  if (!publicListIds.includes(listId as PublicListId)) notFound();
  const selected = listId as PublicListId;
  return <Home initialPublicListId={selected} initialPublicListOwner="lina" />;
}
