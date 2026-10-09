import { useEffect } from "react";
import { CartItemsType, ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";

const ShippingForm = ({ setShippingForm, cart }: { setShippingForm: (data: ShippingFormInputs) => void, cart: CartItemsType }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormInputs>({
        resolver: zodResolver(shippingFormSchema),
    })
    const router = useRouter()
    const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data: ShippingFormInputs) => {
        setShippingForm(data)
        router.push("/cart?step=3", { scroll: false })
    }

    useEffect(() => {
        if (cart.length === 0) {
            router.push("/")
        }
    }, [cart, router])

    if (cart.length === 0) {
        return null
    }
    return (
        <form className="space-y-6 bg-zinc-800 border border-zinc-700 p-6 md:p-8" onSubmit={handleSubmit(handleShippingForm)}>

            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-400 uppercase tracking-wider text-sm">
                    Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("name")}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400 uppercase tracking-wider text-sm">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("email")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-400 uppercase tracking-wider text-sm">
                    Phone
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("phone")}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Address */}
            <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-400 uppercase tracking-wider text-sm">
                    Address
                </Label>
                <Input
                    id="address"
                    type="text"
                    placeholder="123 Main St"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("address")}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>

            {/* City */}
            <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-400 uppercase tracking-wider text-sm">
                    City
                </Label>
                <Input
                    id="city"
                    type="text"
                    placeholder="New York"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("city")}
                />
                {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>

            {/* State */}
            <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-400 uppercase tracking-wider text-sm">
                    State
                </Label>
                <Input
                    id="state"
                    type="text"
                    placeholder="NY"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("state")}
                />
                {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>

            {/* Zip */}
            <div className="space-y-2">
                <Label htmlFor="zip" className="text-gray-400 uppercase tracking-wider text-sm">
                    Zip
                </Label>
                <Input
                    id="zip"
                    type="text"
                    placeholder="10001"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("zip")}
                />
                {errors.zip && <p className="text-sm text-red-500">{errors.zip.message}</p>}
            </div>

            {/* Country */}
            <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-400 uppercase tracking-wider text-sm">
                    Country
                </Label>
                <Input
                    id="country"
                    type="text"
                    placeholder="United States"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("country")}
                />
                {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
            </div>

            {/* Continue Button */}
            <Button
                type="submit"
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider py-6 cursor-pointer"
            >
                Continue
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

        </form>
    )
}

export default ShippingForm;