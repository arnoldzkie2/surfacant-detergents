'use client'
import Header from '@/components/admin/Header'
import OrderHeader from '@/components/admin/orders/orderHeader'
import OrderTable from '@/components/admin/orders/orderTable'
import React from 'react'

const OrdersPage = () => {
    return (
        <div className='px-5 sm:px-10 md:container'>
            <Header />
            <div className='pt-20 flex flex-col gap-10'>
                <OrderHeader />
                <OrderTable />
            </div>
        </div>
    )
}

export default OrdersPage