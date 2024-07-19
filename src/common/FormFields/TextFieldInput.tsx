"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import { ErrorOutlined } from "@mui/icons-material";
import { FlexBox } from "..";

const TextFieldInput = (props: any) => {
  let elemRefs: any = [];
  // const clickEnter = (e: any) => {
  //     if (e.key === "Enter") {
  //         e.preventDefault();
  //         props.clickEnter();
  //     }
  // };

  const onChange = (event: any) => {
    if (props.onChange) {
      let value = event.target.value;
      let newValue = value.replace(/^\s+/g, "");
      event.target.value = newValue;
      props.onChange(event);
    }
  };
  const autoTab = (e: any) => {
    const TAB_KEY = 9;
    let tabindex = e.target.getAttribute("tabIndex") || 0;
    tabindex = Number(tabindex);
    let elem = null;
    if (e.keyCode !== TAB_KEY) {
      elem = tabindex < elemRefs.length - 1 && elemRefs[tabindex + 1];
    }
    if (elem) {
      elem.current.focus();
    }
  };
  return (
    <div
      className={`relative flex flex-col  ${
        props.extracls ? props.extraCls : `gap-2`
      } textFieldCss `}
    >
      <FlexBox className={`justify-between items-center w-full`}>
        <label className={`text-[14px] flex flex-col ${props.lableCls}`}>
          {props.label}
        </label>
      </FlexBox>
      <TextField
        autoFocus={props.autoFocus}
        onChange={(e) => onChange(e)}
        disabled={props.disabled}
        id={props.id}
        variant={props.variant ? props.variant : "outlined"}
        label={props.inputLabel}
        defaultValue={props.defaultValue}
        sx={props.sx}
        className={props.textnewclass}
        color={props.color}
        type={props.type}
        autoComplete={props.autoComplete || "off"}
        name={props.textinputname}
        multiline={props.multiline}
        rows={props.rows}
        fullWidth={props.fullwidthState}
        placeholder={props.placeholder}
        error={props.error}
        InputLabelProps={props.InputLabelProps}
        value={props.value}
        inputProps={props.inputProps}
        helperText={props.helperText}
        onBlur={props.handleBlur}
        //   onKeyDown={(e) => clickEnter(e)}
        required={props.required}
        data-cy={props.dataCy}
        onKeyUp={(e) => {
          autoTab(e);
        }}
        size={props.size}
        InputProps={{
          endAdornment: props.email ? (
            <InputAdornment position="end">
              <ErrorOutlined className="erroricon" />
            </InputAdornment>
          ) : props.endAdornment ? (
            <InputAdornment position="end">
              <p className={`text-black`}>{props.endAdornmentValue}</p>
            </InputAdornment>
          ) : null,
          startAdornment:
            props.startAdorment === "dollar" ? (
              <InputAdornment position="start">
                <p className={`text-black`}>{props.startAdornmentValue}</p>
              </InputAdornment>
            ) : (
              props.startAdorment === "url" && (
                <InputAdornment position="start">
                  <p className="text-inv-blue">{window.location.origin}/</p>
                </InputAdornment>
              )
            ),
          ...props.InputProps,
        }}
      />
      {props.error && (
        <p className={`text-red-500 !text-xs`}>{props.errText}</p>
      )}
    </div>
  );
};

TextFieldInput.propTypes = {
  inputLabel: PropTypes.string,
  color: PropTypes.string,
  extralabelcls: PropTypes.string,
  textnewclass: PropTypes.string,
  textinputname: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  defaultValue: PropTypes.any,
  error: PropTypes.bool,
  fullwidthState: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  inputProps: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.any,
  clickEnter: PropTypes.func,
  startAdorment: PropTypes.node,
  helperText: PropTypes.string,
  startIcon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  dataCy: PropTypes.string,
  errText: PropTypes.string,
  size: PropTypes.string,
  lableCls: PropTypes.string,
  extraCls: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  InputProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  sx: PropTypes.object,
  id: PropTypes.string,
  endAdornment: PropTypes.bool,
  endAdornmentValue: PropTypes.any,
  startAdornmentValue: PropTypes.string,
  noLabelAndHelp: PropTypes.bool,
  autoFocus: PropTypes.bool,
  seclabel: PropTypes.string,
  seclabelCls: PropTypes.string,
  isSecLabel: PropTypes.bool,
  secLabelClick: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default TextFieldInput;
