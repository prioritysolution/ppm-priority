"use client";
import {
  ButtonFieldInput,
  CheckBox,
  FlexBetween,
  FlexBox,
  FlexCenter,
  FlexContentCenter,
  FlexItemCenter,
  PasswordFieldInput,
  TextFieldInput,
} from "@/common";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import text from "@/languages/en_US.json";
import Image from "next/image";
import { loginDescImage, logo } from "@/Images";
import { WhatsApp } from "@mui/icons-material";
import Link from "next/link";
import { pathName } from "@/utils/route";

interface LoginProps {
  loginFormik: any;
  handleRememberMe(event: React.ChangeEvent<HTMLInputElement>): void;
  remember: boolean;
  loading: boolean;
}

const Login: FC<LoginProps> = ({
  loginFormik,
  handleRememberMe,
  remember,
  loading,
}) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      loginFormik?.handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keypress", handleKeyDown);
    };
  }, []);
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        className={`!bg-gradient-to-br from-sky-300 via-indigo-500 to-sky-600 text-white w-full min-h-screen`}
      >
        <FlexBetween className={`p-5 !flex-col !items-start !h-full !w-full `}>
          {/* <Typography component={`h1`} className={`!text-white !text-4xl !font-bold`}>
          PPM
        </Typography> */}
          <FlexItemCenter gap={2}>
            <Box className={`!w-16`}>
              <Image src={logo} alt={"PPM"} />
            </Box>
            <Typography
              component={"h4"}
              className="!text-md md:!text-xl font-bold"
            >
              {text.companyDetails.companyName}
            </Typography>
          </FlexItemCenter>
          <Box className={`space-y-10 !w-full`}>
            <Typography
              component={`h1`}
              className={`!text-white !text-3xl !font-bold`}
            >
              {text.welcomeTo}&nbsp; <br />
              {text.companyDetails.companyName}
            </Typography>
            <Typography
              component={`h1`}
              className={`!text-white !text-base !font-semibold w-[70%]`}
            >
              {text.companyDetails.description}
            </Typography>
          </Box>
          <Typography component={`p`} className={`!text-sm !text-white`}>
            <Typography component="span">{text.copyrightBy}</Typography> &copy;
            &nbsp;
            <Typography component={"span"}>
              {text.companyDetails.companyName}
            </Typography>
            &nbsp;
            <Typography component={"span"}>
              {text.companyDetails.estd} &nbsp;
            </Typography>
            <Typography
              component={`span`}
              className={`!text-sm !text-indigo-200 hover:!text-sky-300 cursor-pointer hover:underline`}
            >
              {text.rightsReserved}
            </Typography>
          </Typography>
        </FlexBetween>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <FlexBox className={`!justify-end !p-5`} id="login">
          {/* <Box>
          <Typography component={`p`} className={`!text-sm !font-semibold`}>
            {text.signUptext.msg}&nbsp;
            <Link href={``} className={`!text-sky-400 hover:underline`}>
              {text.signUptext.signUp}
            </Link>
          </Typography>
          <Typography component={`p`} className={`!text-sm !font-semibold`}>
            {text.loginText.msg}&nbsp;
            <Link href={``} className={`!text-sky-400 hover:underline`}>
              {text.loginText.customerLogin}
            </Link>
          </Typography>
        </Box> */}
        </FlexBox>
        <FlexCenter className={`!w-full !h-[80%] !flex-col`} gap={2}>
          <FlexItemCenter gap={3}>
            <Image src={loginDescImage} alt={`PPM`} height={50} />
            <Typography
              component={`h3`}
              className={`!text-lg !font-semibold !text-slate-500`}
            >
              {text.companyDetails.companyName}&nbsp;{text.loginText.login}
            </Typography>
          </FlexItemCenter>
          <form
            className={` !w-full p-5 md:p-0 md:!w-1/2 flex flex-col gap-5`}
            onSubmit={loginFormik?.handleSubmit}
          >
            <TextFieldInput
              inputLabel={text.label.email}
              placeholder={text.placeholders.email}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`email`}
              onChange={loginFormik?.handleChange}
              value={loginFormik?.values?.email}
              handleBlur={loginFormik?.handleBlur}
              error={
                loginFormik?.touched?.email &&
                Boolean(loginFormik?.errors?.email)
              }
              helperText={
                loginFormik?.touched?.email && loginFormik?.errors?.email
              }
              fullwidthState
            />
            <PasswordFieldInput
              inputLabel={text.label.password}
              placeholder={text.placeholders.password}
              extraCls={`w-full`}
              color={`success`}
              fullwidthState
              passwordinputText={`password`}
              onChange={loginFormik?.handleChange}
              value={loginFormik?.values?.password}
              handleBlur={loginFormik?.handleBlur}
              error={
                loginFormik?.touched?.password &&
                Boolean(loginFormik?.errors?.password)
              }
              helperText={
                loginFormik?.touched?.password && loginFormik?.errors?.password
              }
            />
            <ButtonFieldInput
              name={text.signIn}
              buttonextracls={`!rounded-sm !shadow !bg-sky-400 !p-3 !text-sm !capitalize rounded-full hover:bg-blue-400`}
              variant={`contained`}
              type={"submit"}
              loading={loading}
              disabled={loading}
            />
            <FlexContentCenter className="w-full">
              {/* <FlexItemCenter className={`!text-xs`}>
              <CheckBox checked={remember} handleBoxChange={handleRememberMe} />
              <Typography component={`p`} className={`!text-sm !font-semibold !text-slate-500 md:!text-xs`}>
                {text.rememberMe}
              </Typography>
            </FlexItemCenter> */}
              <Link href={pathName.forgetpassword}>
                <Typography
                  component={`p`}
                  className={`text-sm font-semibold text-slate-500 md:text-xs cursor-pointer hover:text-blue-400 hover:underline`}
                >
                  {text.forgetPassword}
                </Typography>
              </Link>
            </FlexContentCenter>
          </form>
          <FlexItemCenter>
            <Typography component={`p`} className={`!text-sm !font-semibold`}>
              {text.support} &#58;&nbsp;
            </Typography>
            <Typography
              component={`span`}
              className={`!font-bold !text-sm !text-sky-500 cursor-pointer`}
            >
              {text.phoneNumbers.numberOne}&#44;&nbsp;
            </Typography>
            <Typography
              component={`span`}
              className={`!font-bold !text-sm !text-sky-500 cursor-pointer`}
            >
              {text.phoneNumbers.numberOne}&nbsp;
            </Typography>
          </FlexItemCenter>
          <FlexItemCenter gap={2}>
            <WhatsApp color="success" height={5} />
            <Typography
              component={`span`}
              className={`!font-bold !text-sm !text-green-400 cursor-pointer`}
            >
              {text.whatsAppNumber}
            </Typography>
          </FlexItemCenter>
        </FlexCenter>
      </Grid>
    </Grid>
  );
};

export default Login;
