import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Bookmark } from "lucide-react";
import { Button } from "./button";
import type { ProductCardProps } from "@/types";

export const ProductCard: FC<ProductCardProps> = ({ id, isBookmarked, debut, name, onToggleBookmark, onRemoveProduct }) => (
    <Card className="relative" onClickCapture={() => console.log('onClick')}>
        <button
            className="absolute -top-2 right-2"
            onClick={() => onToggleBookmark(id)}
        >
            <Bookmark size={32} fill={isBookmarked ? 'bg-zinc-50' : 'white'} />
        </button>
        <CardHeader>{name}</CardHeader>
        <CardContent className="line-clamp-2">
            Debut Year: {debut}
        </CardContent>
        <CardFooter className="mt-auto">
            <Button className="w-full" size="sm" variant="destructive" onClick={() => onRemoveProduct(id)}>Удалить</Button>
        </CardFooter>
    </Card>
)