'use client'
import Header from '@/components/admin/Header'
import OrderForm from '@/components/admin/orders/OrderForm'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useCategoryStore } from '@/lib/store/categoryStore'

import React, { useEffect } from 'react'

const Page = () => {

    const { getAllCategory } = useCategoryStore()

    useEffect(() => {
        getAllCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='px-5 sm:px-10 md:container'>
            <Header currentPage="orders" />
            <div className='pt-20 flex flex-col gap-10'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/orders">Order Page</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create New Order</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <OrderForm />
            </div>
        </div>
    )
}

export default Page