import Home from "../../page";
import { publicWorks } from "../../p1-public-fixtures";

export default async function WorkPage({ params }: { params: Promise<{ workId: string }> }) {
  const { workId } = await params;
  const work = publicWorks.find((candidate) => candidate.id === workId);
  return <Home initialPublicView="discover" initialPublicWorkId={work?.id} />;
}
