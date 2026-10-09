import { CartItemsType, PaymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const PaymentForm = ({ cart }: { cart: CartItemsType }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormInputs>({
        resolver: zodResolver(paymentFormSchema),
    })
    const router = useRouter()
    const handlePaymentForm: SubmitHandler<PaymentFormInputs> = () => {
        router.push("/cart?step=confirmation", { scroll: false })
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
        <form className="space-y-6 bg-zinc-800 border border-zinc-700 p-6 md:p-8" onSubmit={handleSubmit(handlePaymentForm)}>
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="cardHolder" className="text-gray-400 uppercase tracking-wider text-sm">
                    Name on Card
                </Label>
                <Input
                    id="cardHolder"
                    type="text"
                    placeholder="John Doe"
                    defaultValue="John Doe"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("cardHolder")}
                />
                {errors.cardHolder && <p className="text-sm text-red-500">{errors.cardHolder.message}</p>}
            </div>
            {/* Card Number */}
            <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-gray-400 uppercase tracking-wider text-sm">
                    Card Number
                </Label>
                <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234567890123456"
                    defaultValue="1234567890123456"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("cardNumber")}
                />
                {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
            </div>
            {/* Expiration Date */}
            <div className="space-y-2">
                <Label htmlFor="expirationDate" className="text-gray-400 uppercase tracking-wider text-sm">
                    Expiration Date
                </Label>
                <Input
                    id="expirationDate"
                    type="text"
                    placeholder="01/32"
                    defaultValue="01/32"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("expirationDate")}
                />
                {errors.expirationDate && <p className="text-sm text-red-500">{errors.expirationDate.message}</p>}
            </div>
            {/* CVV */}
            <div className="space-y-2">
                <Label htmlFor="cvv" className="text-gray-400 uppercase tracking-wider text-sm">
                    CVV
                </Label>
                <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    defaultValue="123"
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-red-600"
                    {...register("cvv")}
                />
                {errors.cvv && <p className="text-sm text-red-500">{errors.cvv.message}</p>}
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Image src="/klarna.png" alt="klarna" width={50} height={25} className="rounded-md" />
                <Image src="/cards.png" alt="cards" width={50} height={25} className="rounded-md" />
                <Image src="/stripe.png" alt="stripe" width={50} height={25} className="rounded-md" />
            </div>

            {/* Continue Button */}
            <Button
                type="submit"
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider py-6 cursor-pointer"
            >
                Checkout
                <ShoppingCart className="w-3 h-3" />
            </Button>
        </form>
    )
}

export default PaymentForm;