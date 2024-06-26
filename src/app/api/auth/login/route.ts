import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {

        const { username, password } = await req.json()

        const admin = await prisma.admin.findUnique({
            where: { username, password }
        })

        if (!admin) return NextResponse.json(null, { status: 404 })

        return NextResponse.json(admin, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Server error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}