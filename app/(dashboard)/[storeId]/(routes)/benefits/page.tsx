import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BenefitColumn } from "./components/columns";
import { BenefitsClient } from "./components/client";

const BenfitsPage = async ({ params }: { params: { storeId: string } }) => {
  const benefits = await prismadb.benefit.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBenefits: BenefitColumn[] = benefits.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BenefitsClient data={formattedBenefits} />
      </div>
    </div>
  );
};

export default BenfitsPage;
