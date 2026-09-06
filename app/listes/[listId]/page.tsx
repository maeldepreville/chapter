import Home from "../../page";
import { publicListIds, type PublicListId } from "../../catalogue";

export default async function PublicListPage({ params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params;
  const selected = publicListIds.includes(listId as PublicListId) ? listId as PublicListId : "places";
  return <Home initialPublicListId={selected} initialPublicListOwner="lina" />;
}
