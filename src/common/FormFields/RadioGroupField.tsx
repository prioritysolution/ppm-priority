import { ColorLens } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FC } from "react";

interface RadioData {
  value: string | number;
  label: string;
}
interface RadioGroupProps {
  extraCls?: string;
  labelCls?: string;
  label?: string;
  value: string;
  handleChange(): void;
  radioData: RadioData[];
  color?: "success" | "error" | "warning" | "info";
  row?: boolean;
  disabled?: boolean;
}

const RadioGroupField: FC<RadioGroupProps> = ({
  handleChange,
  radioData,
  value,
  color,
  row,
  label,
  labelCls,
  extraCls,
  disabled = false,
}) => {
  return (
    <FormControl className={extraCls} disabled={disabled}>
      <FormLabel
        id="demo-controlled-radio-buttons-group"
        className={labelCls}
        color={color}
      >
        {label}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        color={color}
        row={row}
      >
        {radioData.map((data: RadioData) => (
          <FormControlLabel
            key={data.value}
            value={data.value}
            control={<Radio />}
            label={data.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupField;
