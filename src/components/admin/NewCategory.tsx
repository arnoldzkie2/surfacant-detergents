import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useCategoryStore } from '@/lib/store/categoryStore'
import SubmitButton from '../ui/submit-button'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'

const NewCategory = () => {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const { createCategory } = useCategoryStore()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} variant={'outline'}>New Category</Button>
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