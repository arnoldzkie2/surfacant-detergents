import { badRequestRes, createdRes, getSearchParams, notFoundRes, okayRes, serverErrorRes } from "@/lib/api/apiResponse";
import { NextRequest } from "next/server";
import { Order, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (req: NextRequest) => {

    try {

        const orderID = getSearchParams(req, 'orderID')
        const categoryID = getSearchParams(req, 'categoryID')


        //if orderID exist return the specific order
        if (orderID) {

            const order = await prisma.order.findUnique({ where: { id: Number(orderID) } })
            if (!order) return notFoundRes("Order")
            //return 404 response if order not found

            //return a 200 response
            return okayRes(order)
        }

        //if categoryID exist return all orders in this category
        if (categoryID) {

            const category = await prisma.category.findUnique({
                where: { id: Number(categoryID) },
                select: {
                    orders: {
                        orderBy: {
                            created_at: 'desc'
                        }
                    }
                }
            })
            if (!category) return notFoundRes("Category")
            //return 404 response if category not found

            //return 200 response and pass category orders
            return okayRes(category.orders)

        }

        //if none of those ID passed then return all orders

        const orders = await prisma.order.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })

        if (!orders) return badRequestRes("Faild to get all orders")

        //return all orders
        return okayRes(orders)

    } catch (error) {
        //return 500 response
        console.log(error);
        return serverErrorRes(error)
    } finally {
        //disconnect to database
        await prisma.$disconnect()
    }
}

export const POST = async (req: NextRequest) => {
    try {

        //get the request body 
        const body: Order = await req.json()

        //create the order
        const createOrder = await prisma.order.create({
            data: body
        })
        if (!createOrder) return badRequestRes("Failed to create the order")
        //return 400 response if it fails

        //return 201 response
        return createdRes(createOrder)

    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}

export const PATCH = async (req: NextRequest) => {

    try {

        const orderID = getSearchParams(req, 'orderID')

        const body: Order = await req.json()

        const updateOrder = await prisma.order.update({
            where: {
                id: Number(orderID)
            }, data: body
        })
        if (!updateOrder) badRequestRes("Failed to update order")

        return okayRes()

    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}

export const DELETE = async (req: NextRequest) => {


    try {
        const orderID = getSearchParams(req, 'orderID')

        await prisma.order.delete({ where: { id: Number(orderID) } })

        return okayRes()

    } catch (error) {
        console.log(error);
        return serverErrorRes(error)
    } finally {
        await prisma.$disconnect()
    }
}