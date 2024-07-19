import { TableCommon } from '@/common'
import { Box } from '@mui/material'
import { FC } from 'react'
import CardPosForm from './CardPosForm'
import CardPosTable from './CardPosTable'
import text from '@/languages/en_US.json'
import { Dayjs } from 'dayjs'
import { useSelector } from 'react-redux'

interface CardPosProps {
    handleCloseCardDrawer(): void
    handleOpenCardDrawer(): void
    openCardDrawer: boolean
    posType: string
    handlePosTypes(event?: React.ChangeEvent<HTMLInputElement>): void
    AddCardPosFormik: any
    errorMessage: string
    handleInstallationDate(): void
    handleInstallationDateError(): void,
    installationDate: Dayjs | null
    loader: boolean
    postLoaders: boolean
    handleEditPosData(data: any): void
    editData: any
}

const CardPos: FC<CardPosProps> = ({ handleCloseCardDrawer, handleOpenCardDrawer, handleInstallationDateError, loader,
    openCardDrawer, handlePosTypes, posType, AddCardPosFormik, errorMessage, handleInstallationDate,
     installationDate, postLoaders, handleEditPosData, editData }) => {

    const bankPosData = useSelector((state: any) => state.cardPos?.bankPosData)?.map((bankData: any) => {
        return {
            name: bankData.Bank_Name,
            value: bankData.Id
        }
    })

    const cardPosData = useSelector((state: any) => state.cardPos?.CardPosData)

    return <Box className={`min-h-[90vh]`}>
        <TableCommon
            title={text.tableTitles.cardPos}
            btnName={text.add.addCardPos}
            titleTextCls={`font-bold text-black text-3xl`}
            titleCls='mb-5'
            addComponent={<CardPosForm handleCloseDrawer={handleCloseCardDrawer}
                openForm={openCardDrawer} formik={AddCardPosFormik}
                date={installationDate} errMessage={errorMessage}
                handleDateChange={handleInstallationDate} handleError={handleInstallationDateError}
                handlePosType={handlePosTypes}
                posType={posType}
                bankData={bankPosData}
                postLoaders={postLoaders}
            editData={editData}
            />}
            handleOpenButton={handleOpenCardDrawer}
            tableComponent={<CardPosTable cardPosData={cardPosData}
                loading={loader}
                handleEditPosData={handleEditPosData}
            />}
        />
    </Box>
}

export default CardPos