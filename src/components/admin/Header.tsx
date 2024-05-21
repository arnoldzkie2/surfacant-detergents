/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import React from 'react'
import { ToggleTheme } from '../ui/toggle-theme'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/react'
import { Label } from '../ui/label'
const Header = () => {
    return (
        <div className='flex top-0 left-0 w-screen padding fixed md:sticky md:p-0 md:w-full h-16 backdrop-blur padding items-center z-50 justify-between border-b'>
            <h1 className='text-2xl font-black text-primary'>Surfacant</h1>
            <ul className='flex items-center gap-5 text-muted-foreground'>
                <Link href={'/admin/category'} className='hover:text-foreground'>
                    <Label className='cursor-pointer'>Category</Label>
                </Link>
                <Link href={'/admin/orders'} className='hover:text-foreground'>
                    <Label className='cursor-pointer'>Orders</Label>
                </Link>
            </ul>
            <div className='flex items-center gap-1'>
                <ToggleTheme />
                <Button variant={'ghost'} onClick={() => signOut()}>
                    <FontAwesomeIcon icon={faRightToBracket} width={16} height={16} className='md:hidden' />
                    <span className='hidden md:flex'>Logout</span>
                </Button>
            </div>
        </div>
    )
}

export default Header