import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useCategoryStore } from '@/lib/store/categoryStore'
import SubmitButton from '@/components/ui/submit-button'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

const NewCategory = () => {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const { createCategory } = useCategoryStore()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className='w-32'>New Category</Button>
      <AlertDialogContent className='w-96'>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Category</AlertDialogTitle>
        </AlertDialogHeader>
        <form className='flex flex-col gap-5' onSubmit={(e) => createCategory(e, name, setOpen)}>
          <div className='flex flex-col gap-1.5'>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Category Name' />
          </div>
          <div className='flex items-center w-full justify-end gap-5'>
            <Button variant={'ghost'} type='button' onClick={() => setOpen(false)}>Close</Button>
            <SubmitButton msg="Create" />
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NewCategory