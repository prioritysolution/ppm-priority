import { DashBoardHeaderTypes } from "@/types/data-types";
import text from '@/languages/en_US.json'
import { CardGiftcard, CreditCard, LocalGasStation, LocalLibrary, ReceiptLong, WaterDrop } from "@mui/icons-material";

export const DashboardHeaderCardData: DashBoardHeaderTypes[]=[
    {
        icon: <LocalGasStation className={`text-red-500`}/>,
        title: text.dashboardHeader.meterReading
    },
    {
        icon: <WaterDrop className={`text-green-500`}/>,
        title: text.dashboardHeader.lubricantSale
    },
    {
        icon: <CreditCard className={`text-sky-500`}/>,
        title: text.dashboardHeader.creditSale
    },
    {
        icon: <CardGiftcard className={`text-indigo-500`}/>,
        title: text.dashboardHeader.voucherEntry
    },
    {
        icon: <LocalLibrary className={`text-orange-400`}/>,
        title:text.dashboardHeader.dayBook
    },
    {
        icon: <ReceiptLong className={`text-yellow-500`} />,
        title: text.dashboardHeader.purchaseInvoice
    }
]