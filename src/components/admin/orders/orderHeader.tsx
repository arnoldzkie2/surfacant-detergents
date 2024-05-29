import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoryStore } from '@/lib/store/categoryStore'
import React from 'react'
import NewOrder from './NewOrder'

const OrderHeader = () => {
  const { category, categoryID, setCategoryID } = useCategoryStore()

  return (
    <div className='flex items-center gap-5 self-start'>
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
      <NewOrder />
    </div>
  )
}

export default OrderHeader