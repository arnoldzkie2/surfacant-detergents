import Header from '@/components/admin/Header'
import ViewOrder from '@/components/admin/orders/ViewOrder'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import prisma from '@/lib/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface Props {
    params: {
        orderID: string
    }
}

const Page = async ({ params }: Props) => {

    const orderID = Number(params.orderID)
    cookies()

    const order = await prisma.order.findUnique({ where: { id: orderID } })

    if (!order) return redirect('/admin/orders')

    return (
        <div className='px-5 sm:px-10 md:container'>
            <Header currentPage="orders" />
            <div className='py-20 flex flex-col gap-10'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/orders">Order Page</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>View Order</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ViewOrder order={order} />
            </div>
        </div>
    )
}

export default Page