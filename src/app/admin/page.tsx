'use client'
import NewCategory from '@/components/admin/NewCategory'
import NewOrder from '@/components/admin/NewOrder'
import ViewOrder from '@/components/admin/ViewOrder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCategoryStore } from '@/lib/store/categoryStore'
import { useOrderStore } from '@/lib/store/orderStore'
import { SelectValue } from '@radix-ui/react-select'
import React, { useEffect } from 'react'

const AdminPage = () => {

    const { orders, getOrders } = useOrderStore()
    const { category, getAllCategory, categoryID, setCategoryID } = useCategoryStore()

    useEffect(() => {
        getOrders()
        if (!category) getAllCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryID])

    return (
        <div className='px-44 flex gap-20 py-20'>
            <Card className='w-80 self-start'>
                <CardHeader>
                    <CardTitle>Select Category</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-10 w-full'>
                    <Select onValueChange={(id) => setCategoryID(id === 'all' ? '' : id)} value={categoryID}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value={'all'}>All Category</SelectItem>
                                {category && category.length > 0 ? category.map(obj => (
                                    <SelectItem key={obj.id} value={String(obj.id)}>{obj.name}</SelectItem>
                                )) : ''}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='w-full items-center flex gap-5'>
                        <NewOrder />
                        <NewCategory />
                    </div>
                </CardContent>
            </Card>
            <Card className='w-full'>
                <CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption></TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">P.O #</TableHead>
                                    <TableHead>Rev #</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>UnitPrice</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Operation</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders && orders.length > 0 ? orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium w-24">SDC-{order.id}</TableCell>
                                        <TableCell className='w-24'>{order.rev_no}</TableCell>
                                        <TableCell >{order.description}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>{order.unit}</TableCell>
                                        <TableCell>{Number(order.price)}</TableCell>
                                        <TableCell>{(Number(order.price) * Number(order.quantity)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <ViewOrder orderID={String(order.id)} />
                                        </TableCell>
                                    </TableRow>
                                )) : orders && orders.length === 0 ? <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>No Data</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow> :
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(skel => (
                                        <TableRow key={skel} >
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-24' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-24' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-28' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-32' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-32' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-32' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-32' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-32' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='h-6 rounded-lg w-32' />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </CardHeader>
            </Card>
        </div >
    )
}

export default AdminPage