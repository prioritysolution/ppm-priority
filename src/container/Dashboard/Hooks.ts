import getSessionStorageData from "@/utils/getSessionStorageData"
import { Dispatch, SetStateAction, useState } from "react"

export const DashBoardHooks = () => {

    const orgId=getSessionStorageData('orgId')
    const token=getSessionStorageData('token')


    const [showSaleData, setShowSaleData] = useState<boolean>(true)
    const [showPurchaseData, setShowPurchaseData] = useState<boolean>(true)
    const [showStockGraph, setShowStockGraph] = useState<boolean>(true)

    const handleToggleDataCards = (setShowData: Dispatch<SetStateAction<boolean>>, type: 'show' | 'hide') => {
        switch (type) {
            case "show":
              setShowData(true)
                break;
            case "hide":
                setShowData(false)
                break;
        }
    }
    return {
        showSaleData,
        setShowSaleData,
        showPurchaseData,
        setShowPurchaseData,
        showStockGraph,
        setShowStockGraph,
        handleToggleDataCards,
        token, orgId
    }
}