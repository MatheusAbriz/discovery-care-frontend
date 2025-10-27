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
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/authContext"

export const Login = () =>{
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const loading = useLoader(isLoading);
    const { login } = useAuth();

    const handleLogin = async(data: FieldValues) =>{
        try{
            setIsLoading(true);
            const res = await loginUser(data.domain_email, data.phone, data.password);
            if(res.status === 200){
                const userData = {
                    domain_email: data.domain_email,
                    phone: data.phone,
                    isAdmin: res.data.isAdmin
                }
                login(userData)
                toast.success("Logged in successfully!");
                navigate("/adm");
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
                <Card>
                    <TextTitleLarge>Login</TextTitleLarge>
                    <TextTiny>Login first to use the admin panel</TextTiny>
                    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-2 mt-2">
                        <Label>
                            Email
                            <Input 
                                name="domain_email" 
                                register={register} 
                                isRequired
                                placeholder="email@gmail.com"
                                type="email"
                            />
                            {errors.email && <TextError>{errors.email.message?.toString()}</TextError>}
                        </Label>

                         <Label>
                            Phone
                            <Input 
                                name="phone" 
                                register={register} 
                                isRequired
                                placeholder="8167039"
                                type="text"
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
            {loading && <LoaderOverlay/>}
        </MainContent>
    )
}