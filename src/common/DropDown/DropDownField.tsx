import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, InputLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import Image from 'next/image';
import { FlexBox } from '..';


const DropDownField = (props: any) => {

    const handleChange = (e: any) => {
        props.handleChange(e);
    };
    return (
        <Box sx={{ minWidth: 120 }} className={`${props.dropdownContainerCls} ${props.extraMainCls}`}>
            <FormControl fullWidth>
                <div className={`flex flex-col ${props.label ? 'gap-2' : ''} ${props.dropdownContainerCls}`}>
                    <FlexBox gap={1} alignItems={`center`}>
                        <label className={props.dropDownLabelCls}>{props.label}</label>
                    </FlexBox>
                    <InputLabel id="demo-simple-select-label" color={props.color} 
                    error={props.error}>{props.dropdownLabel}</InputLabel>
                    <Select
                        className={`relative ${props.option ? `` : `text-gray-60`} ${props.dropDownRootCls} ${props.error ? `!border !border-red-400` : ``}`}
                        id={props.id}
                        size={props.size}
                        value={props.option}
                        onChange={handleChange}
                        defaultValue={props.defaultValue}
                        multiple={props.multiple}
                        variant={props.variant}
                        label={props.dropdownLabel}
                        sx={props.sx}
                        SelectDisplayProps={props.SelectDisplayProps}
                        renderValue={props.renderValue}
                        onBlur={props.handleBlur}
                        open={props.open}
                        onOpen={props.onOpen}
                        onClose={props.onClose}
                        native={props.native}
                        name={props.name}
                        error={props.error}
                        disabled={props.disabled}
                        color={props.color}
                        fullWidth={props.fullWidthState}
                    >
                        {/* <MenuItem disabled value={props.placeholder}>
                            {props.placeholder}
                        </MenuItem> */}
                        {props?.selectOption?.map((item: any, idx: number) => (
                            <MenuItem
                                key={idx}
                                value={item.value}
                            // className={`w-max`}
                            >
                                {props?.isTemplate ?
                                    <FlexBox gap={2} className={``}>
                                        <Image src={item?.img} alt="img" />
                                        <FlexBox flexDirection={'column'} gap={1}>
                                            <Typography component={'p'} className={props.titleTempcls}>{item?.name}</Typography>
                                            <Typography component={'p'} className={props.subTitleTempcls}>{item?.subName}</Typography>
                                        </FlexBox>
                                    </FlexBox>
                                    :
                                    item.name
                                }
                            </MenuItem>
                        ))
                        }
                    </Select>
                </div>
                <p style={{
                    marginLeft: '14px',
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    color: 'indianred',
                    marginTop: '2px'
                }}>{props.errorText}</p>
            </FormControl>
        </Box>
    );
}

DropDownField.propTypes = {
    extraMainCls: PropTypes.string,
    dropDownLabelCls: PropTypes.string,
    label: PropTypes.string,
    handleBlur: PropTypes.func,
    dropDownRootCls: PropTypes.string,
    id: PropTypes.string,
    dropdownLabel: PropTypes.string,
    placeholder: PropTypes.string,
    selectOption: PropTypes.array,
    errorTextCls: PropTypes.string,
    defaultValue: PropTypes.any,
    multiple: PropTypes.bool,
    variant: PropTypes.string,
    fullWidthState: PropTypes.bool,
    sx: PropTypes.any,
    color: PropTypes.string,
    SelectDisplayProps: PropTypes.object,
    renderValue: PropTypes.func,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    native: PropTypes.bool,
    filterImg: PropTypes.bool,
    errorText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    size: PropTypes.string,
    handleChange: PropTypes.func,
    option: PropTypes.any,
    name: PropTypes.string,
    dropdownContainerCls: PropTypes.string,
    help: PropTypes.bool,
    error: PropTypes.bool,
    clickEnter: PropTypes.func,
    titleTempcls: PropTypes.string,
    subTitleTempcls: PropTypes.string,
    isTemplate: PropTypes.bool,
    cameraImg: PropTypes.bool,
    timeImg: PropTypes.bool,
    disabled: PropTypes.bool
}

export default DropDownField