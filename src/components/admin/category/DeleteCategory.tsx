import React, { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useCategoryStore } from '@/lib/store/categoryStore'

const DeleteCategory = ({ categoryID }: { categoryID: number }) => {

    const [open, setOpen] = useState(false)

    const { deleteCategory } = useCategoryStore()

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Label className='cursor-pointer hover:text-foreground'>Delete</Label>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Order</AlertDialogTitle>
                </AlertDialogHeader>
                <Label>Are you sure you want to delete this category?</Label>
                <p className='text-muted-foreground'>Deleting this category will delete all orders in this category</p>
                <div className='flex items-center pt-2 gap-5 w-full justify-end'>
                    <Button variant={'ghost'} onClick={() => setOpen(false)}>Close</Button>
                    <Button variant={'destructive'} onClick={async (e) => {
                        await deleteCategory(e, categoryID)
                        setOpen(false)
                    }}>Confirm</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DeleteCategory