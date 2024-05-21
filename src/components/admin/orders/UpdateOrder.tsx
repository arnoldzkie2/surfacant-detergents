import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { OrderFormData, initialFormData, useOrderStore } from '@/lib/store/orderStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoryStore } from '@/lib/store/categoryStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/ui/submit-button'

const UpdateOrder = ({ orderID }: { orderID: number }) => {

    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<OrderFormData>(initialFormData)

    const { getSingleOrder, updateOrder } = useOrderStore()
    const { category, setCategoryID, categoryID } = useCategoryStore()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const [discountedPrice, setDiscountedPrice] = useState(0);

    useEffect(() => {
        // Calculate the discounted price when formData, price, quantity, discount, or vat changes
        const calculateDiscountedPrice = () => {
            const totalPrice = formData.price * formData.quantity;
            const discountAmount = (formData.discount / 100) * totalPrice;
            const discountedPriceWithoutVAT = totalPrice - discountAmount;
            const vatAmount = (formData.vat / 100) * discountedPriceWithoutVAT;
            const discountedPriceWithVAT = discountedPriceWithoutVAT + vatAmount;
            setDiscountedPrice(discountedPriceWithVAT);
        };

        calculateDiscountedPrice();
    }, [formData, formData.price, formData.quantity, formData.discount, formData.vat]);

    useEffect(() => {
        if (open) getSingleOrder(orderID, setFormData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderID, open])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Label className='cursor-pointer hover:text-foreground'>Update</Label>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update Order</AlertDialogTitle>
                </AlertDialogHeader>
                <form className='flex flex-col gap-5 overflow-y-auto max-h-[500px] p-2' onSubmit={(e) => updateOrder({
                    e, formData, setFormData, setOpen, orderID
                })}>
                    <div className='flex items-center gap-10'>
                        <div className='flex flex-col gap-1.5'>
                            <Label>Rev No.</Label>
                            <Input value={formData.rev_no} name='rev_no' onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <Label>Vendor Ref</Label>
                            <Input value={formData.vendor_ref} name='vendor_ref' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='w-full flex items-center gap-10'>
                        <div className='flex flex-col gap-4'>
                            <Label className='border-b pb-1 text-lg'>Vendor Details</Label>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Vendor Company</Label>
                                <Input value={formData.vendor_company} name='vendor_company' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Vendor Address</Label>
                                <Input value={formData.vendor_address} name='vendor_address' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Vendor Contact</Label>
                                <Input value={formData.vendor_contact} name='vendor_contact' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Vendor Phone</Label>
                                <Input value={formData.vendor_phone} name='vendor_phone' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Vendor Email</Label>
                                <Input value={formData.vendor_email} name='vendor_email' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label className='border-b pb-1 text-lg'>Client Details</Label>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Client Company</Label>
                                <Input value={formData.client_company} name='client_company' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Client Address</Label>
                                <Input value={formData.client_address} name='client_address' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Client Contact</Label>
                                <Input value={formData.client_contact} name='client_contact' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Client Phone</Label>
                                <Input value={formData.client_phone} name='client_phone' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Client Email</Label>
                                <Input value={formData.client_email} name='client_email' onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Label className='border-b pb-1 text-lg'>Item Details</Label>
                        <div className='flex items-center gap-10'>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Unit</Label>
                                <Input value={formData.unit} name='unit' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Unit Price</Label>
                                <Input type='number' value={formData.price} name='price' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex items-center gap-10'>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Quantity</Label>
                                <Input type='number' value={formData.quantity} name='quantity' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Discount %</Label>
                                <Input type='number' value={formData.discount} name='discount' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex items-center gap-10'>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Vat %</Label>
                                <Input type='number' value={formData.vat} name='vat' onChange={handleChange} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <Label>Total</Label>
                                <Input value={discountedPrice} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <Label>Description</Label>
                        <Textarea value={formData.description} name='description' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <Label>Prepared By</Label>
                        <Input value={formData.prepared_by} name='prepared_by' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <Label>Checked By</Label>
                        <Input value={formData.checked_by} name='checked_by' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <Label>Approved By</Label>
                        <Input value={formData.approved_by} name='approved_by' onChange={handleChange} />
                    </div>
                    <Select onValueChange={(id) => setCategoryID(id)} value={categoryID}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                {category && category.length > 0 ? category.map(obj => (
                                    <SelectItem key={obj.id} value={String(obj.id)}>{obj.name}</SelectItem>
                                )) : ''}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='flex items-center w-full justify-end gap-5'>
                        <Button className='w-full' variant={'ghost'} type='button' onClick={() => setOpen(false)}>Close</Button>
                        <SubmitButton msg='Update' style='w-full' />
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default UpdateOrder