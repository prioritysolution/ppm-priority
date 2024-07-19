import text from '@/languages/en_US.json'
import { sideBarDataTypes } from '@/types/data-types';
import { pathName } from "@/utils/route";

export const SideBarData: sideBarDataTypes[]=[
    {
        icon:'dashboard',
        description: text.sideBarTexts.dashboard ,
        pathName: pathName.dashboard,
    },
    {
        icon: 'foundation',
        description: text.sideBarTexts.pump,
        pathName: '',
        subMenu: [
            {
                icon: 'foundation',
                description: 'asd',
                pathName: ''
            }
        ]
    },
    {
        icon: 'groups',
        description: text.sideBarTexts.hr,
        pathName: ''
    }
]