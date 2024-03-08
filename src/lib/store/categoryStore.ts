import { Category } from '@prisma/client'
import axios from 'axios'
import { toast } from 'sonner'
import { create } from 'zustand'
import { useGlobalStore } from './globalStore'

interface CategoryStore {
    category: Category[] | null
    categoryID: string
    setCategoryID: (id: string) => void
    getAllCategory: () => Promise<void>
    createCategory: (e: React.FormEvent, name: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => Promise<string | number | void>
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    category: null,
    categoryID: '',
    setCategoryID: (id: string) => set({ categoryID: id }),
    getAllCategory: async () => {
        try {

            const { data } = await axios.get('/api/category')

            if (data.ok) set({ category: data.data })

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    },
    createCategory: async (e: React.FormEvent, name: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {

        e.preventDefault()
        const { setLoading } = useGlobalStore.getState()

        const { getAllCategory } = get()

        try {

            if (!name) return alert("Name is required")
            setLoading(true)
            const { data } = await axios.post('/api/category', { name })

            if (data.ok) {
                getAllCategory()
                setLoading(false)
                setOpen(false)
                toast.success("Success! category created.")
            }

        } catch (error: any) {
            setLoading(false)
            console.log(error);
            if (error.response.data.msg) {
                return toast.error(error.response.data.msg)
            }
            alert("Something went wrong")
        }
    }
}))


