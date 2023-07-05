import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { LightColumn } from "./components/columns";
import { LightsClient } from "./components/client";

const LightsPage = async ({ params }: { params: { storeId: string } }) => {
  const lights = await prismadb.light.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLights: LightColumn[] = lights.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LightsClient data={formattedLights} />
      </div>
    </div>
  );
};

export default LightsPage;
