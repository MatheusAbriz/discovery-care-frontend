import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../pages/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Card } from "../Card";
import { TextTiny, TextTitleLarge } from "@/globals/texts";
import { Button } from "@/pages/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

type OTPProps = {
    userData: {
        passcode: string,
        email: string,
        password: string,
        isAdmin: boolean
    }
}
export const OTP = ({ userData }: OTPProps) => {
    const { login } = useAuth();
    const [userCode, setUserCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () =>{
        if(userCode === userData.passcode){
            login(userData)
            toast.success("Logged in successfully!");
            navigate("/adm");
            return;
        }
        toast.error("Error! Please, try again later!");
    }
    
    return(
        <Card>
            <TextTitleLarge>OTP</TextTitleLarge>
            <TextTiny>Enter the code sent to your email</TextTiny>

            <div className="flex flex-col justify-center items-center mt-4">
                <InputOTP 
                    maxLength={6} 
                    pattern={REGEXP_ONLY_DIGITS} 
                    onChange={(e) => setUserCode(e)}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <Button
                    type="submit"
                    className="mt-6 w-full cursor-pointer"
                    variant="default"
                    size="lg"
                    onClick={handleSubmit}
                >Send</Button>
            </div>
        </Card>
    );
};