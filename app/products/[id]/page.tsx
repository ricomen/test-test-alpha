"use client"
import { use } from "react"
import { useGetProduct } from "@/store/useProductStore"
import { IProduct } from "@/types"
import Image from "next/image"

export default function ProductPage({ params }: { params: Promise<{ id: IProduct['id'] }> }) {
  const { id } = use(params)
  const product = useGetProduct(id)

  if (!product) {
    return <main>
      <div>Нечего показать</div>
    </main>
  }

  const { title, brand, description, price, thumbnail, images } = product

  return (
    <main>
      <Image width={200} height={200} src={thumbnail} alt={title} />
      <p>
        <span className="text-muted-foreground">Name:</span> {title}
      </p>
      <p>
        <span className="text-muted-foreground">Brand:</span> {brand}
      </p>
      <p><span className="text-muted-foreground">Description:</span> {description}</p>
      <p><span className="text-muted-foreground">Price:</span> {price}</p>
      {images.length && (
        <ul className="flex flex-wrap gap-2">
          {images?.map((image) => (
            <li key={image}>
              <Image
                unoptimized
                src={image || '/next.svg'}
                loading="eager"
                width={200}
                height={200}
                style={{
                  width: '200px',
                  height: 'auto'
                }}
                alt={title}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}