"use client"
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useAddProduct } from '@/store/useProductStore'

export const myFormSchema = z.object({
    title: z.string().min(2, { error: "Текст слишком короткий" }).max(50, { error: "Текст слшком длинный" }),
    description: z.string().min(10, { error: "Текст слишком короткий" }).max(100, { error: "Текст слшком длинный" }),
});

type FormData = z.infer<typeof myFormSchema>;

const ReqiredFileMessage: FC<{ message: string }> = ({ message }) => <p className="text-xs">{message}</p>

export const CreateProductForm = () => {
    const addProduct = useAddProduct();
    const { handleSubmit, control, reset } = useForm<FormData>({
        mode: 'all',
        reValidateMode: "onBlur",
        resolver: zodResolver(myFormSchema)
    })

    const onSubmit = (data: FormData) => {
        // передаем из формы только поля title и description
        addProduct({
            id: Date.now(),
            title: data.title,
            description: data.decription,
            category: 'beauty',
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            tags: ['beauty'],
            brand: 'Essence',
            sku: '',
            weight: 0,
            dimensions: { width: 0, height: 0, depth: 0 },
            warrantyInformation: '',
            shippingInformation: '',
            availabilityStatus: 'In Stock',
            reviews: [],
            returnPolicy: '',
            minimumOrderQuantity: 1,
            meta: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                barcode: '',
                qrCode: ''
            },
            thumbnail: '',
            images: []
        });

        reset();
    }

    return (
        <form
            className="flex flex-col space-y-2 mx-auto max-w-[400px]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col">
                <label
                    className="font-medium text-sm"
                    htmlFor="title"
                >
                    Заголовок
                </label>
                <Controller
                    control={control}
                    name="title"
                    defaultValue=""
                    render={({ field, fieldState }) =>
                        <>
                            <input
                                {...field}
                                className="border shadow-sm rounded-sm p-2"
                                id="title"
                                type="text"
                            />
                            {fieldState.invalid && <ReqiredFileMessage message={fieldState?.error?.message ?? ''} />}
                        </>
                    }
                />

            </div>

            <div className="flex flex-col">
                <label
                    className="font-medium text-sm"
                    htmlFor="description"
                >
                    Описание
                </label>
                <Controller
                    control={control}
                    name="description"
                    defaultValue=""
                    render={({ field, fieldState }) => (
                        <>
                            <textarea
                                className="border shadow-sm rounded-sm p-2"
                                {...field}
                                name="description"
                                id="description"
                            />
                            {fieldState.invalid && <ReqiredFileMessage message={fieldState?.error?.message ?? ''} />}
                        </>
                    )}
                />

            </div>

            <Button className="w-full mt-6">Добавить товар</Button>
        </form>
    )
}

