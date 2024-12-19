import { Breadcrumb, Typography } from "antd";
import Link from "next/link";
import FormExam from "../_components/FormExam";

const { Title } = Typography;

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          {
            title: <Link href="/quan-ly-de-thi">Quản lý đề thi</Link>,
          },
          {
            title: "Chỉnh sửa đề thi",
          },
        ]}
      />

      <FormExam examId={examId} />
    </>
  );
}
