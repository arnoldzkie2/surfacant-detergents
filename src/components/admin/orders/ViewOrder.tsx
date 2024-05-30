/* eslint-disable @next/next/no-img-element */
'use client'
import { Order } from '@prisma/client'
import React, { useRef } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useReactToPrint } from 'react-to-print';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const ViewOrder = ({ order }: {
    order: Order
}) => {

    const orderRef = useRef<any>(null)

    const handleGeneratePdf = useReactToPrint({
        content: () => orderRef.current,
        documentTitle: `SDC-${order.id}.pdf`
    })

    const calculateDiscountedTotal = () => {
        const items = JSON.parse(order.items) as {
            unit: string;
            price: string;
            total_price: string;
            description: string;
            quantity: number;
        }[];

        const subtotal = items.reduce((total, item) => {
            return total + (Number(item.price) * Number(item.quantity));
        }, 0);

        const discountAmount = (subtotal * (Number(order.discount) / 100));
        const discountedSubtotal = subtotal - discountAmount; // Subtotal after deducting discount

        return discountedSubtotal;
    };

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
        <div className='flex flex-col gap-5 w-full'>
            <div className='bg-white text-black border-2 border-black p-10 flex flex-col gap-8 w-1000 min-w-[1000px] self-center' ref={orderRef}>
                <div className='flex w-full justify-between'>
                    <div className='flex flex-col gap-3'>
                        <img width={200} height={60} src={'/logo.svg'} alt='Logo' />
                        <h1 className='text-2xl font-bold italic'>Surfacant Detergents Company</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-bold italic'>Purchase Order</h1>
                        <div className='flex w-52'>
                            <Label className='border border-black text-base w-1/2 px-1 bg-slate-200 flex items-center'>P.O no.</Label>
                            <div className='border border-black w-full bg-green-200 text-center'>
                                SDC-{order.id}
                            </div>
                        </div>
                        <div className='flex w-52'>
                            <Label className='border border-black text-base w-1/2 px-1 bg-slate-200 flex items-center'>Rev. no.</Label>
                            <div className='border border-black w-full bg-green-200 text-center'>
                                {order.rev_no}
                            </div>
                        </div>
                        <div className='flex w-52'>
                            <Label className='border border-black text-base w-1/2 px-1 bg-slate-200 flex items-center'>Date</Label>
                            <div className='border border-black w-full bg-green-200 text-center'>
                                {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex flex-col border border-black w-96'>
                        <h1 className='w-full border-b border-black text-center bg-slate-200 text-lg font-bold'>Vendor Details</h1>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Company</Label>
                            <div className='p-2 w-full bg-green-200'>{order.vendor_company}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Address</Label>
                            <div className='p-2 w-full bg-green-200'>{order.vendor_address}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Contact</Label>
                            <div className='p-2 w-full bg-green-200'>{order.vendor_contact}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Phone</Label>
                            <div className='p-2 w-full bg-green-200'>{order.vendor_phone}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Email</Label>
                            <div className='p-2 w-full bg-green-200'>{order.vendor_email}</div>
                        </div>
                    </div>
                    <div className='flex flex-col border border-black w-96'>
                        <h1 className='w-full border-b border-black text-center bg-slate-200  text-lg font-bold'>Client Details</h1>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Company</Label>
                            <div className='p-2 w-full bg-green-200'>{order.client_company}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Address</Label>
                            <div className='p-2 w-full bg-green-200'>{order.client_address} lorem</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Contact</Label>
                            <div className='p-2 w-full bg-green-200'>{order.client_contact}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Phone</Label>
                            <div className='p-2 w-full bg-green-200'>{order.client_phone}</div>
                        </div>
                        <div className='flex w-full'>
                            <Label className='w-1/2  border-r-2 border-black p-2'>Email</Label>
                            <div className='p-2 w-full bg-green-200'>{order.client_email}</div>
                        </div>
                    </div>

                </div>
                <div className='flex w-full items-center border border-black'>
                    <div className='w-full flex items-center'>
                        <Label className='p-1 w-1/2 bg-slate-200 border-r-2 border-black'>Vendor Ref.</Label>
                        <div className='w-full pl-1 bg-green-200 border-r-2 border-black'>
                            {order.vendor_ref}
                        </div>
                    </div>
                    <div className='w-full flex items-center'>
                        <Label className='p-1 w-1/2 bg-slate-200 border-r-2 border-black'>Date</Label>
                        <div className='w-full pl-1 bg-green-200 border-r-2 border-black'>
                            {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}
                        </div>
                    </div>
                    <div className='w-full flex items-center'>
                        <Label className='p-1 w-1/2 bg-slate-200 border-r-2 border-black'>Rev no.</Label>
                        <div className='w-full pl-1 bg-green-200 border-black'>
                            {order.rev_no}
                        </div>
                    </div>

                </div>
                <Label className='uppercase'>
                    section: 1 - description of purchase and prices
                </Label>
                <Table>
                    <TableHeader>
                        <TableRow className='border border-black hover:bg-slate-200 bg-slate-200'>
                            <TableHead className='text-black border-black border-r'>No.</TableHead>
                            <TableHead className='text-black border-black border-r'>Description</TableHead>
                            <TableHead className='text-black border-black border-r'>Qty</TableHead>
                            <TableHead className='text-black border-black border-r'>Unit</TableHead>
                            <TableHead className='text-black border-black border-r'>Unit Price</TableHead>
                            <TableHead className='text-black border-black border-r'>Total (SR)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {JSON.parse(order.items).map((item: {
                            unit: string
                            price: string
                            total_price: string
                            description: string
                            quantity: number
                        }, i: number) => (
                            <TableRow key={i} className='bg-green-200 hover:bg-green-200'>
                                <TableCell className='border border-black'>{i + 1}</TableCell>
                                <TableCell className='border border-black'>{item.description}</TableCell>
                                <TableCell className='border border-black'>{item.quantity}</TableCell>
                                <TableCell className='border border-black'>{item.unit}</TableCell>
                                <TableCell className='border border-black'>{item.price}</TableCell>
                                <TableCell className='border border-black'>{(Number(item.price) * Number(item.quantity))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className='w-96 self-end flex flex-col text-center'>
                    <div className='flex w-full'>
                        <div className='p-1 border w-full border-black'>Sub Total</div>
                        <div className='p-1 border w-full border-black bg-green-200'>SR</div>
                        <div className='p-1 border w-full border-black'>{JSON.parse(order.items).reduce((total: number, obj: any) => {
                            return total + (Number(obj.price) * Number(obj.quantity))
                        }, 0)}</div>
                    </div>
                    <div className='flex w-full'>
                        <div className='p-1 border w-full border-black'>Discount</div>
                        <div className='p-1 border w-full border-black bg-green-200'>{order.discount}%</div>
                        <div className='p-1 border w-full border-black'>{calculateDiscountedTotal()}</div>
                    </div>
                    <div className='flex w-full'>
                        <div className='p-1 border w-full border-black'>VAT</div>
                        <div className='p-1 border w-full border-black bg-green-200'>{order.discount}%</div>
                        <div className='p-1 border w-full border-black'>{calculateTotalValue()}</div>
                    </div>
                    <div className='flex w-full'>
                        <div className='p-1 border w-full border-black bg-slate-200 pr-5'>Total Value (SR)</div>
                        <div className='p-1 border w-1/2 border-black'>{calculateTotalValue()}</div>
                    </div>

                </div>
                <div className='w-full flex'>
                    <div className='w-full flex flex-col text-center'>
                        <Label className='border border-black p-1 bg-slate-200'>Prepared by</Label>
                        <div className='border border-black p-1'>
                            {order.prepared_by}
                        </div>
                    </div>
                    <div className='w-full flex flex-col text-center'>
                        <Label className='border border-black p-1 bg-slate-200'>Checked by</Label>
                        <div className='border border-black p-1'>
                            {order.checked_by}
                        </div>
                    </div>
                    <div className='w-full flex flex-col text-center'>
                        <Label className='border border-black p-1 bg-slate-200'>Approved by</Label>
                        <div className='border border-black p-1'>
                            {order.approved_by}
                        </div>
                    </div>

                </div>
                <p>This Purchase Order shall comprise of the followings:</p>
                <ul className='flex flex-col'>
                    <li>Section 1 - Description of Purchase and Prices</li>
                    <li>Section 2 - Payment Terms and Invoicing Details </li>
                    <li>Section 3 - Special Terms & Conditions</li>
                    <li>Section 4 - Technical Specifications</li>
                    <li>Section 5 - General Terms & Conditions</li>
                </ul>
            </div>
            <div className='pt-5 border-t flex items-center gap-5 self-end'>
                <Link href={'/admin/orders'}>
                    <Button variant={'ghost'} className='w-40'>Back</Button>
                </Link>
                <Button className='w-40' onClick={handleGeneratePdf}>Print</Button>
            </div>
        </div>
    )
}

export default ViewOrder