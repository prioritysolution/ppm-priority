import React from 'react'
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";


const ButtonFieldInput = (props: any) => {

    return (
        <Button
            variant={props.variant}
            className={`${props.buttonextracls}`}
            onClick={props.handleClick}
            component={props.component}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            to={props.to}
            disabled={props.disabled}
            type={props.type ? props.type : "submit"}
            data-cy={props.dataCy}
            style={props.style}
            disableRipple={props.disableRipple}
            color={props.color}
            sx={props.sx}
        >
            {props.loading === true ? (
                <div className='loaderwithtxt'>
                    <CircularProgress size={18} color='inherit' />
                </div>
            ) : 
                     <p className={props.extraTextCls}>{props.name}</p>}
        </Button>
    )
}

ButtonFieldInput.propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    component: PropTypes.any,
    to: PropTypes.any,
    type: PropTypes.any,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    name: PropTypes.string,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    buttonextracls: PropTypes.string,
    extraTextCls: PropTypes.string,
    disableRipple: PropTypes.bool,
    color: PropTypes.string,
    sx: PropTypes.object
};

export default ButtonFieldInput