"use client";
import { FlexBox } from "@/common";
import FooterContainer from "@/container/Footer";
import NavBarContainer from "@/container/Navbar";
import SideBarContainer from "@/container/Sidebar";
import { Box } from "@mui/material";
import Image from "next/image";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useRouter } from "next/navigation";
import { pathName } from "@/utils/route";

export default function NotFound() {
  const router = useRouter();

  const handleReturnHome = () => {
    const token = getSessionStorageData("token");
    if (token) router.push(pathName.dashboard);
    else router.push(pathName.login);
  };
  return (
    <Box className={`w-full h-screen`}>
      <NavBarContainer />
      <FlexBox>
        <SideBarContainer />
        <Box className="h-full" sx={{ flexGrow: 1 }}>
          <div className="h-[calc(100vh-8rem)] flex flex-col justify-center items-center gap-10 text-center">
            <Image
              src="/notFound.png"
              alt="Not Found"
              height={350}
              width={350}
            />
            <p className="text-gray-500 text-2xl">
              Oops! Couldn't find the page.
            </p>
            <button
              onClick={handleReturnHome}
              className=" !shadow !bg-sky-400 !p-3 px-10 !text-md !capitalize rounded-full hover:bg-blue-400 font-bold text-white"
            >
              Return Home
            </button>
          </div>
          <FooterContainer />
        </Box>
      </FlexBox>
    </Box>
  );
}
