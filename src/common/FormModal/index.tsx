import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC, ReactNode } from 'react';
import text from '@/languages/en_US.json'
import { ButtonFieldInput, FlexBetween } from '@/common';
import { Close } from '@mui/icons-material';
import dynamic from 'next/dynamic';
const DynamicTypography= dynamic(()=>import('@mui/material/Typography'), {
    ssr: false
})

interface FormModalCommon {
    open: boolean,
    handleClose(): void,
    dialogTitle?: string,
    dialogContentTxtCls?: string,
    dialoguContentTxt: string,
    dialogContent: ReactNode,
    handleAdd(): void,
    addTxt?: string,
    loading: boolean
}

const FormModal: FC<FormModalCommon> = ({ dialogContent, handleAdd, handleClose,
    open, dialogContentTxtCls, dialogTitle, dialoguContentTxt, addTxt, loading }) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            className: 'w-full'
        }}
        className='space-y-5'
    >
        <DialogTitle className='border border-b'>
            <FlexBetween>
                <DynamicTypography className={`font-bold text-xl`} variant='h6'>
                    {dialogTitle}
                </DynamicTypography>
                <Close className={`text-red-500 cursor-pointer`} onClick={handleClose}/>
            </FlexBetween>
        </DialogTitle>
        <DialogContent>
            <DialogContentText className={`${dialogContentTxtCls} py-5`}>
                {dialoguContentTxt}
            </DialogContentText>
            {dialogContent}
        </DialogContent>
        <DialogActions>
            <ButtonFieldInput handleClick={handleClose} name={text.buttonNames.cancel}
                type={'button'}
                variant={`outlined`} buttonextracls={`rounded-full capitalize`} />
            <ButtonFieldInput handleClick={handleAdd}
                name={addTxt ?? text.buttonNames.add} variant={`outlined`}
                buttonextracls={`rounded-full capitalize bg-green-500`} extraTextCls={`text-green-500`}
                loading={loading} disabled={loading}
                 />
        </DialogActions>
    </Dialog>
}

export default FormModal