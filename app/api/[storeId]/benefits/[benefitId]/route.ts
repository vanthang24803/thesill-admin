import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { benefitId: string } }
) {
  try {
    if (!params.benefitId) {
      return new NextResponse("Benefit id is required", { status: 400 });
    }

    const benefit = await prismadb.benefit.findUnique({
      where: {
        id: params.benefitId,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.log("[BENEFIT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { benefitId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.benefitId) {
      return new NextResponse("Benefit id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const benefit = await prismadb.benefit.delete({
      where: {
        id: params.benefitId,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.log("[BENEFIT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { benefitId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.benefitId) {
      return new NextResponse("Benefit id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const benefit = await prismadb.benefit.update({
      where: {
        id: params.benefitId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.log("[BENEFIT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
