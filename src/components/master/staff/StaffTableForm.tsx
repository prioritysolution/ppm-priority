import {
  ButtonFieldInput,
  DatePickerField,
  DropDownField,
  FlexBetween,
  FlexItemCenter,
  PhoneNumberInput,
  TextFieldInput,
} from "@/common";
import {
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { matchIsValidTel } from "mui-tel-input";
import { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";

interface StaffMasterFormProps {
  formik: any;
  handleCloseDrawer(): void;
  openStaffMaster: boolean;
  staffTypeDropdownValue: any;
  staffDesignationDropDownValue: any;
  loading: boolean;
  staffMobile: string;
  handleStaffMobile(number: string): void;
  handleJoiningDate(): void;
  handleJoiningDateError(): void;
  joiningDate: Dayjs | null;
  errorMessage: string;
}

const StaffMasterForm: FC<StaffMasterFormProps> = ({
  formik,
  handleCloseDrawer,
  handleJoiningDate,
  handleJoiningDateError,
  openStaffMaster,
  staffDesignationDropDownValue,
  staffTypeDropdownValue,
  loading,
  handleStaffMobile,
  staffMobile,
  joiningDate,
  errorMessage,
}) => {
  const drawerWidth = 700;
  return (
    <Drawer
      anchor={`right`}
      open={openStaffMaster}
      onClose={handleCloseDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <FlexItemCenter className="h-[4rem] px-2" gap={3}>
        <IconButton onClick={handleCloseDrawer}>
          <KeyboardArrowLeft />
        </IconButton>
        <Typography component={`p`} className={`!font-bold text-2xl`}>
          {text.add.addStaffMaster}
        </Typography>
      </FlexItemCenter>
      <Divider />
      <Container className="py-10">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.staffName}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`staffName`}
                inputLabel={text.label.addStaffMaster.staffName}
                onChange={formik?.handleChange}
                value={formik?.values?.staffName}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.staffName &&
                  Boolean(formik?.errors?.staffName)
                }
                helperText={
                  formik?.touched?.staffName && formik?.errors?.staffName
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.staffAddress}
                inputLabel={text.label.addStaffMaster.staffAddress}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`staffAddress`}
                onChange={formik?.handleChange}
                value={formik?.values?.staffAddress}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.staffAddress &&
                  Boolean(formik?.errors?.staffAddress)
                }
                helperText={
                  formik?.touched?.staffAddress && formik?.errors?.staffAddress
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <PhoneNumberInput
                handleChange={handleStaffMobile}
                phoneNo={staffMobile}
                label={text.label.addStaffMaster.mobile}
                placeholder={text.placeholders.addStaffMaster.mobile}
                errorText={
                  !matchIsValidTel(staffMobile)
                    ? text.errors.patternErrors.addStaffMaster.mobileNo
                    : ""
                }
                handleBlur={() => {
                  !matchIsValidTel(staffMobile);
                }}
                error={!matchIsValidTel(staffMobile)}
                defaultCountry="IN"
                color="success"
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                inputLabel={text.label.addStaffMaster.staffEmail}
                placeholder={text.placeholders.addStaffMaster.staffEmail}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`staffEmail`}
                onChange={formik?.handleChange}
                value={formik?.values?.staffEmail}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.staffEmail &&
                  Boolean(formik?.errors?.staffEmail)
                }
                helperText={
                  formik?.touched?.staffEmail && formik?.errors?.staffEmail
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`staffType`}
                dropdownLabel={text.label.addStaffMaster.staffType}
                // placeholder={text.placeholders.addStaffMaster.staffType}
                color={`success`}
                option={formik?.values?.staffType}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={staffTypeDropdownValue}
                error={
                  formik?.touched?.staffType &&
                  Boolean(formik?.errors?.staffType)
                }
                errorText={
                  formik?.touched?.staffType && formik?.errors?.staffType
                }
                fullWidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`designation`}
                dropdownLabel={text.label.addStaffMaster.designation}
                // placeholder={text.placeholders.addStaffMaster.designation}
                color={`success`}
                option={formik?.values?.designation}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={staffDesignationDropDownValue}
                error={
                  formik?.touched?.designation &&
                  Boolean(formik?.errors?.designation)
                }
                errorText={
                  formik?.touched?.designation && formik?.errors?.designation
                }
                fullWidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DatePickerField
                label={text.label.addStaffMaster.joiningDate}
                handleChange={handleJoiningDate}
                date={joiningDate}
                handleError={handleJoiningDateError}
                errorMessage={errorMessage}
                extraCls={`w-full`}
                handleBlur={handleJoiningDateError}
                color={errorMessage ? "error" : "success"}
                format="DD-MM-YYYY"
                clearable
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.basic}
                inputLabel={text.label.addStaffMaster.basic}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`basic`}
                type={`number`}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                onChange={formik?.handleChange}
                value={formik?.values?.basic}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.basic && Boolean(formik?.errors?.basic)}
                helperText={formik?.touched?.basic && formik?.errors?.basic}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.da}
                inputLabel={text.label.addStaffMaster.da}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`da`}
                type={`number`}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                onChange={formik?.handleChange}
                value={formik?.values?.da}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.da && Boolean(formik?.errors?.da)}
                helperText={formik?.touched?.da && formik?.errors?.da}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.hra}
                inputLabel={text.label.addStaffMaster.hra}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`hra`}
                type={`number`}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                onChange={formik?.handleChange}
                value={formik?.values?.hra}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.hra && Boolean(formik?.errors?.hra)}
                helperText={formik?.touched?.hra && formik?.errors?.hra}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.ta}
                inputLabel={text.label.addStaffMaster.ta}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`ta`}
                type={`number`}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                onChange={formik?.handleChange}
                value={formik?.values?.ta}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.ta && Boolean(formik?.errors?.ta)}
                helperText={formik?.touched?.ta && formik?.errors?.ta}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.misc}
                inputLabel={text.label.addStaffMaster.misc}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`misc`}
                type={`number`}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                onChange={formik?.handleChange}
                value={formik?.values?.misc}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.misc && Boolean(formik?.errors?.misc)}
                helperText={formik?.touched?.misc && formik?.errors?.misc}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addStaffMaster.pf}
                inputLabel={text.label.addStaffMaster.pf}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`pf`}
                type={`number`}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                onChange={formik?.handleChange}
                value={formik?.values?.pf}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.pf && Boolean(formik?.errors?.pf)}
                helperText={formik?.touched?.pf && formik?.errors?.pf}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FlexBetween className={`w-full items-center flex-row-reverse`}>
                <ButtonFieldInput
                  buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                  variant={"contained"}
                  name={text.buttonNames.add}
                  handleClick={
                    joiningDate === null
                      ? handleJoiningDateError
                      : !matchIsValidTel(staffMobile)
                      ? () => {}
                      : formik?.handleSubmit
                  }
                  loading={loading}
                  disabled={loading}
                />
                <ButtonFieldInput
                  buttonextracls={`rounded-full bg-[#BDBDBD] text-black capitalize`}
                  name={text.buttonNames.cancel}
                  variant={"contained"}
                  type={`button`}
                  handleClick={handleCloseDrawer}
                />
              </FlexBetween>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Drawer>
  );
};

export default StaffMasterForm;
