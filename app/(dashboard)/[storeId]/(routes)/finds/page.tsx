import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { FindColumn } from "./components/columns";
import { FindsClient } from "./components/client";


const FindsPage = async ({ params }: { params: { storeId: string } }) => {
  const finds = await prismadb.find.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFinds: FindColumn[] = finds.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FindsClient data={formattedFinds} />
      </div>
    </div>
  );
};

export default FindsPage;
