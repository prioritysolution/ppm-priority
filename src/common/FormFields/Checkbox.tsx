import { Box, Checkbox } from '@mui/material'
import PropTypes from 'prop-types'

function CheckBox(props:any) {

    return (
        <Box className={`checkbox`}>
            <Checkbox
                id={props.id}
                checked={props.checked}
                value={props.value}
                onChange={props.handleBoxChange}
                sx={props.sx}
                required={props.required}
                size={props.size}
                disabled={props.disabled}
                defaultChecked={props.defaultChecked}
                color={props.color}
                inputRef={props.inputRef}
                onClick={props.handleCheck}
            />
        </Box>
    )
}

CheckBox.propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    color: PropTypes.string,
    handleCheck: PropTypes.func,
    sx: PropTypes.any,
    handleBoxChange: PropTypes.func,
};

export default CheckBox
