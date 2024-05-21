'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

const Page = () => {
    return (
        <div className='h-screen w-screen  flex items-center justify-center flex-col gap-5'>
            Something went wrong
            <Button onClick={() => signIn()}>
                Sign In
            </Button>

        </div>
    )
}

export default Page