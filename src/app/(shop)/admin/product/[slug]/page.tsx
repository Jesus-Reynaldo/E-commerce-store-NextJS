import { getCategories, getProductByslug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "../ui/ProductForm";
import { Category } from "@/interfaces/category.interface";

interface Props {
  params:{
    slug: string
  }
}
export default async function ProductPage({params}: Props) {
  const {slug} = params
const [categories, product] = await Promise.all([
  getCategories(), 
  getProductByslug(slug)
])
  if(!product && slug !== 'new'){
    redirect('/admin/products')
  }
  const title = (slug ==='new') ? 'Nuevo Producto' : 'Editar Producto'
  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories as Category[]} />

    </>
  );
}