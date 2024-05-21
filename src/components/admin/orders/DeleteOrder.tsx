import React, { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/store/orderStore'

const DeleteOrder = ({ orderID }: { orderID: number }) => {

    const [open, setOpen] = useState(false)

    const { deleteOrder } = useOrderStore()

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Label className='cursor-pointer hover:text-foreground'>Delete</Label>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Order</AlertDialogTitle>
                </AlertDialogHeader>
                <Label>Are you sure you want to delete this order?</Label>
                <div className='flex items-center pt-2 gap-5 w-full justify-end'>
                    <Button variant={'ghost'} onClick={() => setOpen(false)}>Close</Button>
                    <Button variant={'destructive'} onClick={async (e) => {
                        await deleteOrder(e, orderID)
                        setOpen(false)
                    }}>Confirm</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DeleteOrder