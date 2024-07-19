"use client"
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordFieldInput = (props: any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={` flex flex-col textFieldCss relative ${props.extraCls}`}>
            <label className={`input-label ${props.labelcls}`}>{props.label}</label>
            <TextField
                autoFocus={props.autoFocus}
                onChange={props.onChange}
                disabled={props.disabled}
                id={props.id}
                name={props.passwordinputText}
                variant="outlined"
                label={props.inputLabel}
                defaultValue={props.defaultValue}
                className={props.textnewclass}
                onBlur={props.handleBlur}
                type={"password"}
                size={props.size}
                placeholder={props.placeholder}
                autoComplete="off"
                multiline={props.multiline}
                rows={props.rows}
                color={props.color}
                required={props.required}
                fullWidth={props.fullwidthState}
                error={props.error}
                value={props.value}
                inputProps={props.inputProps}
                helperText={props.helperText}
                data-cy={props.dataCy}
                tabIndex={props.tabIndex}
                InputProps={{
                    className: "pr-2 !rounded-xl",
                    type: showPassword ? "text" : "password",
                    endAdornment: (
                        <InputAdornment position="end" >
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                
                            >
                                <Icon color="action" tabIndex={-1} className="flex h-full items-center justify-center w-full">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Icon>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <p className="text-red-dark text-sm absolute top-18">
                {props.errText}
            </p>
        </div>
    );
};

PasswordFieldInput.propTypes = {
    extralabelcls: PropTypes.string,
    textnewclass: PropTypes.string,
    extraCls: PropTypes.string,
    color: PropTypes.string,
    textinputname: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    error: PropTypes.bool,
    fullwidthState: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    inputProps: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
    clickEnter: PropTypes.func,
    startAdorment: PropTypes.node,
    helperText: PropTypes.string,
    tabIndex: PropTypes.number,
    InputpropSx: PropTypes.object,
    size: PropTypes.string,
    handleBlur: PropTypes.func,
    inputLabel: PropTypes.string,
    passwordinputText: PropTypes.string
};

export default PasswordFieldInput;