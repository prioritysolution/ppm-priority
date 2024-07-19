import text from '@/languages/en_US.json'
import { sideBarDataTypes } from '@/types/data-types';
import { pathName } from "@/utils/route";

export const NavbarData: any = [
//     {
//     icon: 'account_circle',
//     description: text.NavbarData.myProfile,
//     pathName: ''
// },
{
    Menue_Icon: 'logout',
    Menue_Name: text.NavbarData.logout,
    pathName: pathName.login
}
]