import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { findId: string } }
) {
  try {
    if (!params.findId) {
      return new NextResponse("Find id is required", { status: 400 });
    }

    const find = await prismadb.find.findUnique({
      where: {
        id: params.findId,
      },
    });

    return NextResponse.json(find);
  } catch (error) {
    console.log("[FIND_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { findId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.findId) {
      return new NextResponse("Find id is required", { status: 400 });
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

    const find = await prismadb.find.delete({
      where: {
        id: params.findId,
      },
    });

    return NextResponse.json(find);
  } catch (error) {
    console.log("[FIND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { findId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.findId) {
      return new NextResponse("Find id is required", { status: 400 });
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

    const find = await prismadb.find.update({
      where: {
        id: params.findId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(find);
  } catch (error) {
    console.log("[FIND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
