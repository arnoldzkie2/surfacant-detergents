'use client'
import LoginForm from '@/components/auth/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AdminAuthPage = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const session = useSession()
    const router = useRouter()

    const [inputType, setInputType] = useState<'text' | 'password'>('password')

    const loginAdmin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

            const result = await signIn('credentials', {
                username: formData.username,
                password: formData.password,
                redirect: false,
            })
            if (result?.error) {
                toast.error('Invalid Credentials.', {
                    position: 'bottom-center'
                })
            } else {
                toast.success('Login Successfully!', {
                    position: 'bottom-center'
                })
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }

    useEffect(() => {

        if (session.status === 'authenticated') router.push('/admin/orders')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    return (
        <div className='grid w-screen h-screen place-items-center px-5'>
            <Card className='w-full sm:w-96'>
                <CardHeader>
                    <CardTitle className='text-center'>Surfacant Detergent</CardTitle>
                    <CardDescription>Enter your username and password below to sign in.</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                    <LoginForm
                        formData={formData}
                        setFormData={setFormData}
                        loginAdmin={loginAdmin}
                        inputType={inputType}
                        setInputType={setInputType}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminAuthPage