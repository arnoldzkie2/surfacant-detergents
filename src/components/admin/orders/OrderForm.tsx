'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OrderFormData, initialFormData, useOrderStore } from '@/lib/store/orderStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoryStore } from '@/lib/store/categoryStore'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import SubmitButton from '@/components/ui/submit-button'

const OrderForm = ({ orderID }: { orderID?: number }) => {

  const [formData, setFormData] = useState<OrderFormData>(initialFormData)
  const { category, categoryID, setCategoryID } = useCategoryStore()
  const router = useRouter()

  const { createOrder, getSingleOrder, updateOrder } = useOrderStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addItemToForm = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        unit: '',
        price: '',
        total_price: '',
        description: '',
        quantity: 1,
      }]
    }))
  }

  const deleteItemToForm = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((item, i) => i !== index)
    }));
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  }

  const calculateTotalValue = () => {
    const subtotal = formData.items.reduce((total, item) => {
      return total + (Number(item.price) * Number(item.quantity))
    }, 0)

    const discountAmount = (subtotal * (formData.discount / 100));
    const discountedSubtotal = subtotal - discountAmount; // Subtotal after deducting discount

    const vatAmount = (discountedSubtotal * (formData.vat / 100)); // Calculate VAT amount based on the discounted subtotal

    const finalTotalValue = discountedSubtotal + vatAmount; // Add VAT amount to the discounted subtotal

    return finalTotalValue
  }

  useEffect(() => {
    if (orderID) {
      getSingleOrder(orderID, setFormData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className='flex flex-col gap-8 pb-10' onSubmit={
      orderID ?
        (e) => updateOrder({
          formData, orderID, router, calculateTotalValue, e
        })
        :
        (e) => createOrder({
          e, formData, router, calculateTotalValue
        })
    }
    >
      <div className='flex gap-10'>
        <div className='flex flex-col gap-4'>
          <Select onValueChange={(id) => setCategoryID(id === 'all' ? '' : id)} value={categoryID}>
            <SelectTrigger className='w-40'>
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
          <div className='flex flex-col gap-1.5'>
            <Label>Rev No.</Label>
            <Input required
              value={formData.rev_no}
              name='rev_no'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Vendor Ref</Label>
            <Input required
              value={formData.vendor_ref}
              name='vendor_ref'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Prepared By</Label>
            <Input required
              value={formData.prepared_by}
              name='prepared_by'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Checked By</Label>
            <Input required
              value={formData.checked_by}
              name='checked_by'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Approved by</Label>
            <Input required
              value={formData.approved_by}
              name='approved_by'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Label className='text-lg font-black'>Vendor Details</Label>
          <Separator />
          <div className='flex flex-col gap-1.5'>
            <Label>Company</Label>
            <Input required
              value={formData.vendor_company}
              name='vendor_company'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Address</Label>
            <Input required
              value={formData.vendor_address}
              name='vendor_address'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Contact</Label>
            <Input required
              value={formData.vendor_contact}
              name='vendor_contact'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Phone</Label>
            <Input required
              value={formData.vendor_phone}
              name='vendor_phone'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Email</Label>
            <Input required
              value={formData.vendor_email}
              name='vendor_email'
              type='email'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Label className='text-lg font-black'>Client Details</Label>
          <Separator />
          <div className='flex flex-col gap-1.5'>
            <Label>Company</Label>
            <Input required
              value={formData.client_company}
              name='client_company'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Address</Label>
            <Input required
              value={formData.client_address}
              name='client_address'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Contact</Label>
            <Input required
              value={formData.client_contact}
              name='client_contact'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Phone</Label>
            <Input required
              value={formData.client_phone}
              name='client_phone'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label>Email</Label>
            <Input required
              value={formData.client_email}
              name='client_email'
              type='email'
              onChange={handleChange}
              className='text-muted-foreground' />
          </div>
        </div>
        <div className='flex flex-col gap-4 w-1/2'>
          <Label className='text-lg font-black'>Item Details</Label>
          <Separator />
          <div className='flex flex-wrap w-full gap-5'>
            {formData.items.map((obj, i) => (
              <div className='flex flex-col border rounded-md p-5 gap-4' key={i}>
                <div className='flex items-center gap-2 justify-between'>
                  <div className='flex items-center gap-2'>
                    <Label>Total (SR)</Label>
                    <Input readOnly value={(Number(obj.price) * Number(obj.quantity))} className='w-28' />
                  </div>
                  <Button type='button' variant={'destructive'} className='self-end ' onClick={() => deleteItemToForm(i)} title='Remove Item'>
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex flex-col gap-1.5'>
                    <Label>Unit</Label>
                    <Input required value={obj.unit} className='w-16' onChange={(e) => handleItemChange(i, 'unit', e.target.value)} />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <Label>Quantity</Label>
                    <Input required type='number' value={obj.quantity} className='w-12' onChange={(e) => handleItemChange(i, 'quantity', e.target.value)} />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <Label>Price</Label>
                    <Input required type='number' value={obj.price} className='w-24' onChange={(e) => handleItemChange(i, 'price', e.target.value)} />
                  </div>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <Label>Description</Label>
                  <Textarea required value={obj.description} onChange={(e) => handleItemChange(i, 'description', e.target.value)} />
                </div>

              </div>
            ))}
          </div>
          <Button className='w-40' type='button' onClick={addItemToForm}>Add Item</Button>
        </div>
      </div>
      <Separator />
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2'>
          <Label>Sub Total (SR)</Label>
          <Input readOnly value={formData.items.reduce((total, obj) => {
            return total + (Number(obj.price) * Number(obj.quantity))
          }, 0)} className='w-28' />
        </div>
        <div className='flex items-center gap-2'>
          <Label>Discount</Label>
          <Input type='number' placeholder='%' value={formData.discount} onChange={handleChange} name='discount' className='w-28' />
        </div>
        <div className='flex items-center gap-2'>
          <Label>Vat</Label>
          <Input type='number' placeholder='%' value={formData.vat} onChange={handleChange} name='vat' className='w-28' />
        </div>
        <div className='flex items-center gap-2'>
          <Label>Total Value (SR)</Label>
          <div>{calculateTotalValue()}</div>
        </div>
        <div className='ml-auto flex items-center gap-5'>
          <Link href={'/admin/orders'}>
            <Button type='button' variant={'ghost'} className='w-36'>Back</Button>
          </Link>
          <SubmitButton msg={orderID ? 'Update' : 'Create'} style='ml-auto w-36' />
        </div>
      </div>
    </form>
  )
}

export default OrderForm