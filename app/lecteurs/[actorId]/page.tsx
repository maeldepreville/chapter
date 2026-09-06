import Home from "../../page";
import { profileOwnerForActor, prototypeActors, type PrototypeActorId } from "../../prototype-data";

export default async function ReaderPage({ params }: { params: Promise<{ actorId: string }> }) {
  const { actorId } = await params;
  const owner = actorId in prototypeActors ? profileOwnerForActor(actorId as PrototypeActorId) : "lina";
  return <Home initialProfileOwner={owner} />;
}
