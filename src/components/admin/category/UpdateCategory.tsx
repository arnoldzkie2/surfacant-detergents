import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCategoryStore } from '@/lib/store/categoryStore'
import SubmitButton from '@/components/ui/submit-button'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Category } from '@prisma/client'
import { Label } from '@/components/ui/label'

const UpdateCategory = ({ category }: { category: Category }) => {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    const { updateCategory } = useCategoryStore()

    useEffect(() => {
        setName(category.name)
    }, [category])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Label onClick={() => setOpen(true)} className='cursor-pointer hover:text-foreground'>Update</Label>
            <AlertDialogContent className='w-96'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update This Category</AlertDialogTitle>
                </AlertDialogHeader>
                <form className='flex flex-col gap-5' onSubmit={(e) => updateCategory(e, name, setOpen, category.id)}>
                    <div className='flex flex-col gap-1.5'>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Category Name' />
                    </div>
                    <div className='flex items-center w-full justify-end gap-5'>
                        <Button variant={'ghost'} type='button' onClick={() => setOpen(false)}>Close</Button>
                        <SubmitButton msg="Update" />
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UpdateCategory