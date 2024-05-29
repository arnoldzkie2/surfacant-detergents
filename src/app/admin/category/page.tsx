'use client'
import Header from '@/components/admin/Header'
import NewCategory from '@/components/admin/category/NewCategory'
import CategoryTable from '@/components/admin/category/categoryTable'
import React from 'react'

const CategoryPage = () => {

    return (
        <div className='px-5 sm:px-10 md:container'>
            <Header currentPage="category" />
            <div className='pt-20 flex flex-col gap-10'>
                <NewCategory />
                <CategoryTable />
            </div>
        </div>
    )
}

export default CategoryPage