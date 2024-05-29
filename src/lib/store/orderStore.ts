import { Order } from '@prisma/client'
import axios from 'axios'
import { create } from 'zustand'
import { useCategoryStore } from './categoryStore'
import { toast } from 'sonner'
import { useGlobalStore } from './globalStore'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'


const initialFormData: OrderFormData = {
    rev_no: 0,
    vendor_ref: '',
    vendor_company: '',
    vendor_address: '',
    vendor_contact: '',
    vendor_phone: '',
    vendor_email: '',
    client_company: '',
    client_address: '',
    client_contact: '',
    client_phone: '',
    client_email: '',
    items: [{
        total_price: '',
        price: '',
        description: '',
        unit: '',
        quantity: 1
    }],
    discount: 0,
    vat: 0,
    prepared_by: '',
    checked_by: '',
    approved_by: '',
    category_id: 0
};

interface OrderFormData {
    rev_no: number;
    vendor_ref: string;
    vendor_company: string;
    vendor_address: string;
    vendor_contact: string;
    vendor_phone: string;
    vendor_email: string;
    client_company: string;
    client_address: string;
    client_contact: string;
    client_phone: string;
    client_email: string;
    items: {
        total_price: string
        price: string
        unit: string
        quantity: number
        description: string
    }[]
    discount: number;
    vat: number;
    prepared_by: string;
    checked_by: string;
    approved_by: string;
    category_id: number;
}
type OrderStore = {
    orders: Order[] | null
    getOrders: () => Promise<any>
    createOrder: ({ e, formData }: {
        e: React.FormEvent;
        formData: OrderFormData;
        calculateTotalValue: () => number
        router: AppRouterInstance
    }) => Promise<string | number | undefined>
    getSingleOrder: (orderID: number, setFormData: React.Dispatch<React.SetStateAction<OrderFormData>>) => Promise<void>
    deleteOrder: (e: React.MouseEvent, orderID: number) => Promise<void>
    updateOrder: ({ e, formData, orderID }: {
        e: React.FormEvent;
        formData: OrderFormData;
        calculateTotalValue: () => number
        router: AppRouterInstance
        orderID: number;
    }) => Promise<string | number | undefined>
}

export { initialFormData }
export type { OrderFormData }

export const useOrderStore = create<OrderStore>()((set, get) => ({
    orders: null,
    getOrders: async () => {

        const { categoryID } = useCategoryStore.getState()
        try {

            const { data } = await axios.get('/api/order', {
                params: {
                    categoryID: categoryID || undefined,
                }
            })

            if (data.ok) set({ orders: data.data })

        } catch (error: any) {
            if (error.response.data.msg) {
                return toast.error(error.response.data.msg)
            }
            alert("Something went wrongw")
        }
    },
    getSingleOrder: async (orderID: number, setFormData: React.Dispatch<React.SetStateAction<OrderFormData>>
    ) => {
        const { setCategoryID } = useCategoryStore.getState()
        try {

            const { data } = await axios.get('/api/order', {
                params: { orderID }
            })

            if (data.ok) {
                data.data.items = JSON.parse(data.data.items)
                setFormData(data.data)
                setCategoryID(data.data.category_id)
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    },
    createOrder: async ({ e, formData, router, calculateTotalValue }:
        {
            e: React.FormEvent
            formData: OrderFormData
            calculateTotalValue: () => number
            router: AppRouterInstance
        }) => {

        const { setLoading } = useGlobalStore.getState()

        e.preventDefault()

        const { categoryID } = useCategoryStore.getState()

        if (!categoryID) return toast.error("Select Category", { position: 'bottom-center' })

        const updatedFormData = {
            ...formData,
            rev_no: Number(formData.rev_no),
            discount: String(formData.discount),
            vat: String(formData.vat),
            sub_total: formData.items.reduce((total, item) => {
                return total + (Number(item.price) * Number(item.quantity))
            }, 0).toString(),
            total_value: calculateTotalValue().toString(),
            items: JSON.stringify(formData.items),
            category_id: Number(categoryID)
        }

        try {

            setLoading(true)
            const { data } = await axios.post('/api/order', updatedFormData)

            if (data.ok) {
                setLoading(false)
                toast.success("Success! order created.")
                router.push('/admin/orders')
            }

        } catch (error: any) {
            setLoading(false)
            console.log(error);
            if (error.response.data.msg) {
                return toast.error(error.response.data.msg)
            }
            alert("Something went wrong")
        }
    },
    updateOrder: async ({ e, formData, router, calculateTotalValue, orderID }:
        {
            e: React.FormEvent
            formData: OrderFormData
            orderID: number
            calculateTotalValue: () => number
            router: AppRouterInstance
        }) => {

        const { setLoading } = useGlobalStore.getState()
        const { getOrders } = get()

        e.preventDefault()

        const { categoryID } = useCategoryStore.getState()

        if (!categoryID) return toast.error("Select Category", { position: 'bottom-center' })

        const updatedFormData = {
            ...formData,
            rev_no: Number(formData.rev_no),
            discount: String(formData.discount),
            vat: String(formData.vat),
            sub_total: formData.items.reduce((total, item) => {
                return total + (Number(item.price) * Number(item.quantity))
            }, 0).toString(),
            total_value: calculateTotalValue().toString(),
            items: JSON.stringify(formData.items),
            category_id: Number(categoryID)
        }

        try {

            setLoading(true)
            const { data } = await axios.patch('/api/order', updatedFormData, {
                params: {
                    orderID
                }
            })

            if (data.ok) {
                getOrders()
                setLoading(false)
                toast.success("Success! order updated.")
                router.push("/admin/orders")
            }

        } catch (error: any) {
            setLoading(false)
            console.log(error);
            if (error.response.data.msg) {
                return toast.error(error.response.data.msg)
            }
            alert("Something went wrong")
        }

    },
    deleteOrder: async (e: React.MouseEvent, orderID: number) => {

        e.preventDefault()
        const { getOrders } = get()

        try {
            const { data } = await axios.delete('/api/order', {
                params: {
                    orderID
                }
            })

            if (data.ok) {
                toast.success("Success Order deleted.")
                getOrders()
            }

        } catch (error) {
            console.log(error);
        }
    }
}))