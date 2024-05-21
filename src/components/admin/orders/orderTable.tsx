import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderStore } from '@/lib/store/orderStore'
import { useCategoryStore } from '@/lib/store/categoryStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import ViewOrder from './ViewOrder'
import DeleteOrder from './DeleteOrder'
import UpdateOrder from './UpdateOrder'

const OrderTable = () => {

  const { orders, getOrders } = useOrderStore()
  const { category, getAllCategory, categoryID } = useCategoryStore()
  const [open, setOpen] = useState(false)
  const [selectedID, setSelectedID] = useState(0)

  useEffect(() => {
    getOrders()
    if (!category) getAllCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryID])

  return (
    <Table className='h-full w-full'>
      <TableCaption className='pb-32'>Order List</TableCaption>
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
            <TableCell className='relative'>
              <FontAwesomeIcon icon={faEllipsis} className='h-5 w-10 cursor-pointer' onClick={() => {
                setOpen(true)
                setSelectedID(order.id)
              }} />
              <ul className={`${open && selectedID === order.id ? 'block' : 'hidden'} absolute bg-card p-3 gap-2.5 z-20 w-28 shadow-lg border flex flex-col text-muted-foreground`}>
                <Label className='text-foreground'>Operations</Label>
                <Separator />
                <ViewOrder orderID={order.id} />
                <UpdateOrder orderID={order.id} />
                <DeleteOrder orderID={order.id} />
                <li className='hover:text-foreground flex mb-1 justify-between items-center cursor-pointer pt-2 border-t' onClick={() => {
                  setOpen(false)
                  setSelectedID(0)
                }}>Close<FontAwesomeIcon icon={faXmark} /></li>
              </ul>
            </TableCell>
          </TableRow>
        )) : orders && orders.length === 0 ? <TableRow>
          <TableCell>No Data</TableCell>
        </TableRow> :
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(skel => (
            <TableRow key={skel} >
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-12' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-16' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-28' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-32' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-20' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-16' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-20' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-32' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-24' />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default OrderTable