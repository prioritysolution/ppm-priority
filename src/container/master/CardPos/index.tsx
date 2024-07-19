"use client"
import CardPos from '@/components/master/cardPos'
import React, { useEffect } from 'react'
import { CardPosHooks } from './Hooks'

const CardPosContainer = () => {
    const {
        handleCloseCardDrawer,
        handleOpenCardDrawer,
        openCardDrawer, posType,
        handlePosTypes,
        AddCardPosFormik,
        errorMessage,
        handleInstallationDate,
        handleInstallationDateError,
        installationDate, getBankPosApiCall,
        token, orgId, getCardPosApiCall,
        loader, postLoaders,
        handleEditPosData,
         editData
    } = CardPosHooks()

    useEffect(() => {
      if(token && orgId){
        getCardPosApiCall(orgId)
        getBankPosApiCall(orgId)
      }
    }, [token , orgId])
    
    return (
        <CardPos handleCloseCardDrawer={handleCloseCardDrawer}
            handleOpenCardDrawer={handleOpenCardDrawer}
            openCardDrawer={openCardDrawer}
            posType={posType}
            handlePosTypes={handlePosTypes}
            AddCardPosFormik={AddCardPosFormik}
            errorMessage={errorMessage}
            handleInstallationDate={handleInstallationDate}
            handleInstallationDateError={handleInstallationDateError}
            installationDate={installationDate}
            loader={loader}
            postLoaders={postLoaders}
            handleEditPosData={handleEditPosData}
            editData={editData}
        />
    )
}

export default CardPosContainer
