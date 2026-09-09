import Home from "../../page";
import { profileOwnerForActor, prototypeActors, type PrototypeActorId } from "../../prototype-data";
import { notFound } from "next/navigation";

export default async function ReaderPage({ params }: { params: Promise<{ actorId: string }> }) {
  const { actorId } = await params;
  if (!(actorId in prototypeActors)) notFound();
  const owner = profileOwnerForActor(actorId as PrototypeActorId);
  return <Home initialProfileOwner={owner} />;
}
