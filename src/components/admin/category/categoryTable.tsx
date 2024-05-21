import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderStore } from '@/lib/store/orderStore'
import { useCategoryStore } from '@/lib/store/categoryStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import UpdateCategory from './UpdateCategory'
import DeleteCategory from './DeleteCategory'

const CategoryTable = () => {

  const { category, getAllCategory, categoryID } = useCategoryStore()
  const [open, setOpen] = useState(false)
  const [selectedID, setSelectedID] = useState(0)

  useEffect(() => {
    getAllCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Table className='h-full w-full'>
      <TableCaption className='pb-32'>Category List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Category ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Total Orders</TableHead>
          <TableHead>Operation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {category && category.length > 0 ? category.map((obj: any) => (
          <TableRow key={obj.id}>
            <TableCell className="font-medium">{obj.id}</TableCell>
            <TableCell >{obj.name}</TableCell>
            <TableCell>{new Date(obj.created_at).toLocaleString()}</TableCell>
            <TableCell>{obj.total_orders}</TableCell>
            <TableCell className='relative'>
              <FontAwesomeIcon icon={faEllipsis} className='h-5 w-10 cursor-pointer' onClick={() => {
                setOpen(true)
                setSelectedID(obj.id)
              }} />
              <ul className={`${open && selectedID === obj.id ? 'block' : 'hidden'} absolute bg-card p-3 gap-2.5 z-20 w-28 shadow-lg border flex flex-col text-muted-foreground`}>
                <Label className='text-foreground'>Operations</Label>
                <Separator />
                <UpdateCategory category={obj} />
                <DeleteCategory categoryID={obj.id} />
                <li className='hover:text-foreground flex mb-1 justify-between items-center cursor-pointer pt-2 border-t' onClick={() => {
                  setOpen(false)
                  setSelectedID(0)
                }}>Close<FontAwesomeIcon icon={faXmark} /></li>
              </ul>
            </TableCell>
          </TableRow>
        )) : category && category.length === 0 ? <TableRow>
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
                <Skeleton className='h-6 rounded-lg w-24' />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default CategoryTable