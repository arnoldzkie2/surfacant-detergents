import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderStore } from '@/lib/store/orderStore'
import { useCategoryStore } from '@/lib/store/categoryStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faEye, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import DeleteOrder from './DeleteOrder'
import Link from 'next/link'

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
      <TableCaption className='pb-40'>Order List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">P.O #</TableHead>
          <TableHead>Rev #</TableHead>
          <TableHead>Prepared by</TableHead>
          <TableHead>Checked by</TableHead>
          <TableHead>Approved by</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Total Value (SR)</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Operation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders && orders.length > 0 ? orders.map((order) => {

          const calculateTotalValue = () => {

            const items = JSON.parse(order.items) as {
              unit: string
              price: string
              total_price: string
              description: string
              quantity: number
            }[]
            const subtotal = items.reduce((total, item) => {
              return total + (Number(item.price) * Number(item.quantity))
            }, 0)

            const discountAmount = (subtotal * (Number(order.discount) / 100));
            const discountedSubtotal = subtotal - discountAmount; // Subtotal after deducting disacount

            const vatAmount = (discountedSubtotal * (Number(order.vat) / 100)); // Calculate VAT amount based on the discounted subtotal

            const finalTotalValue = discountedSubtotal + vatAmount; // Add VAT amount to the discounted subtotal

            return finalTotalValue
          }

          return (
            <TableRow key={order.id}>
              <TableCell className="font-medium w-24">SDC-{order.id}</TableCell>
              <TableCell className='w-24'>{order.rev_no}</TableCell>
              <TableCell>{order.prepared_by}</TableCell>
              <TableCell>{order.checked_by}</TableCell>
              <TableCell>{order.approved_by}</TableCell>
              <TableCell>{order.discount}</TableCell>
              <TableCell>{calculateTotalValue()}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
              <TableCell className='relative'>
                <FontAwesomeIcon icon={faEllipsis} className='h-5 w-10 cursor-pointer' onClick={() => {
                  setOpen(true)
                  setSelectedID(order.id)
                }} />
                <ul className={`${open && selectedID === order.id ? 'block' : 'hidden'} absolute bg-card p-3 gap-2.5 z-20 w-28 shadow-lg border flex flex-col text-muted-foreground`}>
                  <Label className='text-foreground'>Operations</Label>
                  <Separator />
                  <Link href={`/admin/orders/view/${order.id}`} className='flex items-center hover:text-foreground justify-between'>
                    <Label className='cursor-pointer'>View</Label>
                    <FontAwesomeIcon icon={faEye} width={16} height={16} />
                  </Link>
                  <Link href={`/admin/orders/update/${order.id}`} className='flex items-center hover:text-foreground justify-between'>
                    <Label className='cursor-pointer'>Update</Label>
                    <FontAwesomeIcon icon={faPenToSquare} width={16} height={16} />
                  </Link>
                  <DeleteOrder orderID={order.id} />
                  <li className='hover:text-foreground flex mb-1 justify-between items-center cursor-pointer pt-2 border-t' onClick={() => {
                    setOpen(false)
                    setSelectedID(0)
                  }}>Close<FontAwesomeIcon icon={faXmark} /></li>
                </ul>
              </TableCell>
            </TableRow>
          )
        }) : orders && orders.length === 0 ? <TableRow>
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
              <TableCell>
                <Skeleton className='h-6 rounded-lg w-24' />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table >
  )
}

export default OrderTable