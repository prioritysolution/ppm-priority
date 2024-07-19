import { Box, Skeleton } from "@mui/material"

const SideBarSkeleton = ({ }) => {
    return <Box className={`w-full p-5`}>
        <Skeleton height={70} width={'100%'} />
        <Skeleton height={70} width={'90%'} />
        <Skeleton height={70} width={'80%'} />
        <Skeleton height={70} width={'70%'} />
        <Skeleton height={70} width={'60%'} />
        <Skeleton height={70} width={'50%'} />
        <Skeleton height={70} width={'40%'} />
        <Skeleton height={70} width={'30%'} />
        <Skeleton height={60} width={'20%'} />
        <Skeleton height={50} width={'10%'} />
    </Box>
}

export default SideBarSkeleton