import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Bookmark, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { IProduct } from "@/types";

interface IProps extends IProduct {
  onToggleBookmark: (id: IProduct['id']) => void
  onRemoveProduct: (id: IProduct['id']) => void
}

export const ProductCard: FC<IProps> = ({
  id,
  description,
  thumbnail,
  title,
  isBookmarked,
  onToggleBookmark,
  onRemoveProduct
}) => {
  const router = useRouter();

  return (
    <Card
      className="relative group"
      onClick={() => router.push(`/products/${id}`)}
      role="button"
      tabIndex={0}
    >

      <button
        className="absolute -top-2 right-2"
        onClick={(evt) => {
          evt.stopPropagation()
          onToggleBookmark(id)
        }}
      >
        <Bookmark size={32} fill={isBookmarked ? 'bg-zinc-50' : 'white'} />
      </button>

      <button
        className="absolute -left-2 -top-2 p-1 hidden group-hover:block rounded-full color-white bg-destructive hover:bg-destructive/70 shadow-sm"
        onClick={(evt) => {
          evt.stopPropagation()
          onRemoveProduct(id)
        }}
      >
        <X size={16} stroke="white" fill="white" />
      </button>

      <CardHeader className="line-clamp-1">
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Image
          src={thumbnail || '/next.svg'}
          loading="eager"
          width={100}
          height={100}
          alt={title}
          style={{
            width: "100%",
            height: 'auto'
          }}
        />
      </CardContent>
      <CardFooter className="text-sm line-clamp-2">
        {description}
      </CardFooter>

    </Card>
  )
}