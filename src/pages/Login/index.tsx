/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { Card } from "../../components/Card"
import { Input } from "../../components/Inputs/input"
import { LoaderOverlay } from "../../components/LoaderOverlay"
import { Label, TextError, TextTiny, TextTitleLarge } from "../../globals/texts"
import { useLoader } from "../../hooks/useLoader"
import { Button } from "../components/ui/button"
import { MainContent } from "./styles"
import { useForm, type FieldValues } from "react-hook-form"
import { loginUser } from "../../service/userService"
import toast from "react-hot-toast"
import { generateCode } from "../../utils/utils"
import { OTP } from "@/components/OTP"
import { send } from "@emailjs/browser";

export const Login = () =>{
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        passcode: '',
        email: '',
        password: '',
        isAdmin: false
    })
    const [isOpen, setIsOpen] = useState(false);
    const loading = useLoader(isLoading);

    const handleLogin = async(data: FieldValues) =>{
        try{
            setIsLoading(true);
            const res = await loginUser(data.email, data.password);
            if(res.status === 200){
                const code = generateCode();
                setUserData({
                    passcode: code,
                    email: data.email,
                    password: data.password,
                    isAdmin: res.data
                })
                await send(
                    import.meta.env.VITE_API_SERVICE_EMAIL,
                    import.meta.env.VITE_API_TEMPLATE_EMAIL, {
                        passcode: code,
                        email: data.email
                    }, {
                        publicKey: import.meta.env.VITE_API_EMAIL_PUBLIC_KEY
                    }
                )
                setIsOpen(true);
            };
        }catch(err){
            toast.error("Error! Please, try again later!");
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <MainContent>
            {isOpen ? (
                <OTP userData={userData}/>
            ) : (<>
                <Card>
                    <TextTitleLarge>Login</TextTitleLarge>
                    <TextTiny>Login first to use the admin panel</TextTiny>
                    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-2 mt-2">
                        <Label>
                            Email
                            <Input 
                                name="email" 
                                register={register} 
                                isRequired
                                placeholder="email@gmail.com"
                                type="email"
                            />
                            {errors.email && <TextError>{errors.email.message?.toString()}</TextError>}
                        </Label>

                        <Label>
                            Password
                            <Input
                                name="password"
                                register={register}
                                isRequired
                                type="password"
                                placeholder="*******"
                            />

                            {errors.password && <TextError>{errors.password?.message?.toString()}</TextError>}
                        </Label>


                        <Button size="lg" type="submit" className="cursor-pointer">Login</Button>
                    </form>
                </Card>

            </>)}

            {loading && <LoaderOverlay/>}
        </MainContent>
    )
}