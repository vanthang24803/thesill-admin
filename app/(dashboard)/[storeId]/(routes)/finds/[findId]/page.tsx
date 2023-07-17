import prismadb from "@/lib/prismadb";
import { FindForm } from "./components/find-form";


const FindPage = async ({ params }: { params: { findId: string } }) => {
  const find = await prismadb.find.findUnique({
    where: {
      id: params.findId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FindForm initialData={find} />
      </div>
    </div>
  );
};

export default FindPage;
