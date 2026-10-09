"use client"

import ProductCard from "./ProductCard"
import { Button } from "./ui/button"
import Categories from "./Categories"
import { useRouter } from "next/navigation"
import Filter from "./Filter"
import { useEffect, useState } from "react"
import ProductSkeleton from "./ProductSkeleton"
import { api, ApiResponse } from "@/lib/api/client"
import { ProductType } from "@/types"

type GetProductsResponse = {
    products: ProductType[];
};

const ProductList = ({ category, params }: { category: string, params: "homepage" | "products" }) => {
    const router = useRouter();

    const [products, setProduct] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = await api.get<ApiResponse<GetProductsResponse>>("/api/products")
            if (!res.success) {
                setLoading(false);
                return <div className="text-white">No products found.</div>;
            }
            setLoading(false);
            setProduct(res.data.products)
        }
        fetchProducts()
    }, []);

    return (
        <div className="bg-zinc-900 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-white uppercase tracking-wider mb-3">
                        Shop The Collection
                    </h2>
                    <div className="w-16 h-1 bg-red-600 mx-auto" />
                </div>

                <Categories />
                {params === "products" && <Filter />}

                {loading ? (
                    // Loading Skeleton
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Button
                                size="lg"
                                className="border-2 border-gray-600 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 px-10 py-6 uppercase tracking-wider"
                                onClick={() => router.push(category ? `/products/?category=${category}` : "/products")}
                            >
                                View All Products
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductList