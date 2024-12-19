import Exam from "./_components/Exam";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;

  return <Exam examId={examId} />;
}
