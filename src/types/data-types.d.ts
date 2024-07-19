import { ReactNode } from "react";

interface subMenu{
    icon: string,
description: string,
pathName: string
}
export interface sideBarDataTypes{ 
    icon: string,
description: string,
pathName: string
subMenu?: subMenu[]
}

export interface DashBoardHeaderTypes{
    icon: ReactNode,
    title: string
}

interface nozzleData{
    id: number | null
    nozzleName: string
    tankName: string
    tankId: number | null
}
