import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from './Index.module.css'
import { Typography } from "@mui/material";
import text from '@/languages/en_US.json'

interface OtpInputProps {
    length?: number;
    onOtpSubmit: (otp: string) => void;
    resendHandler(): void
}

const OtpFieldInput: React.FC<OtpInputProps> = ({ length = 4, onOtpSubmit = () => { }, resendHandler }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [timer, setTimer] = useState<number>(9)
    const [enableResend, setEnableResend] = useState<boolean>(false)

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        const update = () => {
            setTimer(prev => prev - 1);
        }
        if (timer > 0) {
            var interval = setInterval(update, 1000);
            setEnableResend(false)
        }else{
            setEnableResend(true)
        }
        return () => clearInterval(interval);
    }, [timer])

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];

        // Allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Submit trigger
        const combinedOtp = newOtp.join("");

        if (combinedOtp?.length === length) {
            onOtpSubmit(combinedOtp);
        }

        // Move to next input field if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // Optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Moving focus on the previous input field on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input as HTMLInputElement)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={styles.otpInput}
                    />
                );
            })}
            <Typography component={'p'} className={`text-sm font-medium`}>
                {`${text.forgotPassword.resendOtpMsg}`}
                <Typography component={`span`} className={`text-sm font-semibold text-blue-400`}>
                    &nbsp;{timer}&nbsp;
                </Typography>
                {text.forgotPassword.seconds}
            </Typography>
                <Typography component={'p'} className={`${enableResend ? `${styles.otpResendActive}` : `${styles.otpResendNotActive}`} font-semibold text-sm text-center`} onClick={enableResend ? ()=>{
                    resendHandler()
                    setEnableResend(false)
                    setTimer(9)
                    }: ()=>{}}>
                    {text.forgotPassword.resend}
                </Typography>
        </div>
    );
};

export default OtpFieldInput;
