import prismadb from "@/lib/prismadb";
import { LightForm } from "./components/light-form";


const LightPage = async ({ params }: { params: { lightId: string } }) => {
  const light = await prismadb.light.findUnique({
    where: {
      id: params.lightId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LightForm initialData={light} />
      </div>
    </div>
  );
};

export default LightPage;
