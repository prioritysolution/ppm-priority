import { MuiTelInput, MuiTelInputCountry } from 'mui-tel-input'
import { FC } from 'react'

interface PhoneNumberInputProps {
    phoneNo: string
    handleChange(number: string): void
    color?: 'success' | 'error' | 'warning'
    defaultCountry?: MuiTelInputCountry
    error: boolean
    handleBlur?(): void
    errorText: string
    label: string
    extraCls?: string
    placeholder?: string
    fullwidthState?: boolean
}

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({ handleChange, phoneNo, color, error,
     handleBlur, errorText, label, extraCls, placeholder, fullwidthState, defaultCountry }) => {
    return <MuiTelInput value={phoneNo}
        onChange={handleChange} color={color}
        error={error}
        onBlur={handleBlur}
        helperText={errorText}
        label={label}
        className={extraCls}
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        fullWidth={fullwidthState}
    />

}

export default PhoneNumberInput