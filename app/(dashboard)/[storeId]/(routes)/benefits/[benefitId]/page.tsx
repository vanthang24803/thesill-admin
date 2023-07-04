import prismadb from "@/lib/prismadb";
import { BenefitForm } from "./components/benefit-form";


const BenefitPage = async ({ params }: { params: { benefitId: string } }) => {
  
    const benefit = await prismadb.benefit.findUnique({
    where: {
      id: params.benefitId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BenefitForm initialData={benefit} />
      </div>
    </div>
  );
};

export default BenefitPage;
