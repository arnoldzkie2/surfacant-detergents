'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from '../ui/button'
import { useGlobalStore } from '@/lib/store/globalStore'

interface Props {
    msg: string
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    style?: string
    onClick?: any
    type?: "button" | "submit" | "reset" | undefined
}

const SubmitButton = ({ msg, variant, style, onClick, type }: Props) => {

    const loading = useGlobalStore(s => s.loading)

    if (loading) return <Skeleton variant={variant} style={style} />

    return (
        <Button onClick={onClick} type={type} variant={variant} className={style}>{msg}</Button>
    )
}

const Skeleton = ({ variant, style }: { style?: string, variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined }) => {
    return (
        <Button variant={variant} className={style} disabled>
            <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} />
        </Button>
    )
}

export default SubmitButton