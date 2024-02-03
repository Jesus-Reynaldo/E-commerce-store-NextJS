import { Size } from "@/interfaces"
import clsx from "clsx"

interface Props{
  selectedSize: Size,
  availableSize: Size[],
}
export const SizeSelector = ({selectedSize, availableSize}:Props) => {
  return (
    <div>
      {
        availableSize.map((size)=>(
          <button key={size} 
          className={
            clsx(
              "mx-2 hover:underline text-lg",
              {
                "underline": size === selectedSize
              }
            )
          }>
            {size}
          </button>
        ))
      }
    </div>
  )
}
