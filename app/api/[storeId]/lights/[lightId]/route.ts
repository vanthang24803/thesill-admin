import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { lightId: string } }
) {
  try {
    if (!params.lightId) {
      return new NextResponse("Light id is required", { status: 400 });
    }

    const light = await prismadb.light.findUnique({
      where: {
        id: params.lightId,
      },
    });

    return NextResponse.json(light);
  } catch (error) {
    console.log("[LIGHT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { lightId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.lightId) {
      return new NextResponse("Light id is required", { status: 400 });
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

    const light = await prismadb.light.delete({
      where: {
        id: params.lightId,
      },
    });

    return NextResponse.json(light);
  } catch (error) {
    console.log("[LIGHT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { lightId: string; storeId: string } }
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

    if (!params.lightId) {
      return new NextResponse("Light id is required", { status: 400 });
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

    const light = await prismadb.light.update({
      where: {
        id: params.lightId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(light);;
  } catch (error) {
    console.log("[LIGHT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
