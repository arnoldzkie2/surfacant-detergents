'use client'
import { Order } from '@prisma/client'
import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const PrintOrder = ({ order }: { order: Order }) => {

    const orderRef = useRef<any>(null);

    const [open, setOpen] = useState(false)

    const handleGeneratePdf = async () => {

        const inputData = orderRef.current;

        try {
            const canvas = await html2canvas(inputData, {
                scale: 2
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`sdc-${order.id}.pdf`);
            setOpen(false)
        } catch (error) {
            setOpen(false)
            console.log(error);
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <div className='flex items-center hover:text-foreground justify-between'>
                    <Label className='cursor-pointer'>Print</Label>
                    <FontAwesomeIcon icon={faPrint} width={16} height={16} />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                {/* <div>
                    <div ref={orderRef} className='flex flex-col gap-5 p-5 text-black rounded-lg bg-white'>
                        <h1>Order Details</h1>
                        <p>Order ID: {order.id}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Prepared by: ${order.prepared_by}</p>
                        <p>Prepared by: ${order.prepared_by}</p>
                    </div>
                </div> */}
                <div className='flex items-center gap-10 w-full'>
                    <Button className='w-full' onClick={handleGeneratePdf}>Print</Button>
                    <Button variant={'ghost'} className='w-full' onClick={() => setOpen(false)}>Close</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PrintOrder