import { badRequestRes, createdRes, getSearchParams, notFoundRes, okayRes, serverErrorRes } from "@/lib/api/apiResponse";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async () => {
    try {

        //return all category
        const allCategory = await prisma.category.findMany({
            include: {
                orders: {
                    select: {
                        id: true
                    }
                }
            }
        })
        if (!allCategory) return badRequestRes("Failed to get all category")

        const modifyCategory = allCategory.map(category => ({
            ...category,
            orders: undefined,
            total_orders: category.orders.length
        }))

        return okayRes(modifyCategory)

    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: NextRequest) => {

    try {

        //get the name in request body
        const { name } = await req.json()
        if (!name) return notFoundRes("Category Name")

        //create the category
        const newCategory = await prisma.category.create({
            data: { name }
        })
        if (!newCategory) return badRequestRes("Failed to create new category")

        //return 201 response
        return createdRes(newCategory)

    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}

export const PATCH = async (req: NextRequest) => {

    try {

        //get the name in request body
        const { name, categoryID }: { name: string, categoryID: number } = await req.json()
        if (!name) return notFoundRes("Category Name")
        //return 404 if none of this passed
        if (!categoryID) return notFoundRes("Category")

        //retrieve category before updating
        const category = await prisma.category.findUnique({ where: { id: categoryID } })
        if (!category) return notFoundRes("Category")

        //update the category
        const updateCategory = await prisma.category.update({
            where: { id: categoryID },
            data: { name }
        })
        if (!updateCategory) return badRequestRes("Failed to create new category")

        //return 200 response
        return okayRes(updateCategory)

    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const categoryID = getSearchParams(req, 'categoryID')

        if (!categoryID) return notFoundRes("Category")

        await prisma.category.delete({ where: { id: Number(categoryID) } })

        return okayRes()
    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}