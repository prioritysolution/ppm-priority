import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import text from "@/languages/en_US.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getNoteDenomApi,
  postMeterReadingData,
  postProcessMeterReadData,
} from "./MeterReadingApis";
import { getMeterReadingData, getNoteDenom } from "./MeterReadingReducer";

export const MeterReadingHooks = () => {
  const dispatch = useDispatch();
  const orgId = getSessionStorageData("orgId");
  const token = getSessionStorageData("token");
  const meterReadingData = useSelector(
    (state: any) => state.meterReading?.meterReadingData
  );

  //active steps
  const [activeSteps, setActiveSteps] = useState<number>(0);

  //loaders
  const [loading, setLoading] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);
  const [postGstLoaders, setPostGstLoaders] = useState<boolean>(false);
  const [postFinalLoaders, setPostFinalLoaders] = useState<boolean>(false);

  //data in addMeterReadingFormik
  const [addMeterReading, setAddMeterReading] = useState<any>(null);

  //bank transaction array
  const [bankTransactionData, setBankTransactionData] = useState<any>([]);

  //meter reading grand total
  const [meterReadingGrandTotal, setMeterReadingGrandTotal] =
    useState<number>(0);

  //gst get grand total
  const [gstGrandTotal, setGstGrandTotal] = useState<number>(0);

  //bank transaction grand total
  const [bankTransactionTotal, setBankTransactionTotal] = useState<number>(0);

  //table array
  const [meterReading, setMeterReading] = useState<any>([]);

  //gst table array
  const [gstTable, setGstTable] = useState<any>([]);

  //disable states
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  //show add more modal
  const [showAddMoreModal, setShowAddMoreModal] = useState<boolean>(false);

  //show modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //denominator array
  const [denominators, setDenominators] = useState<string[]>([]);

  //cash transaction total amounts array
  const [cashTransactionTotal, setCashTransactionTotal] = useState<number[]>(
    []
  );

  //cash transaction grand total
  const [cashTransactionGrandTotal, setCashTransactionGrandTotal] =
    useState<number>(0);

  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [decimal, setDecimal] = useState<number>(0);
  const [decimalInput, setDecimalInput] = useState<number>(0);
  const [decimalInputError, setDecimalInputError] = useState<string>("");
  const [calculateCheck, setCalculateCheck] = useState<boolean>(false);

  const [finalAmountDiff, setFinalAmountDiff] = useState<number>(0);

  //cash denom get api data
  const cashDenomData = useSelector(
    (state: any) => state.meterReading?.noteDenom
  );

  //cash denom post array
  const [cashDenomArray, setCashDenomArray] = useState<any>([]);

  const nozzleOptions = useSelector(
    (state: any) => state.pumpMasterData?.nozzleData
  )?.map((nozzleData: any) => {
    return {
      name: nozzleData.Nozzle_Name,
      value: nozzleData.Id,
    };
  });

  const cardPosOptions = useSelector(
    (state: any) => state.cardPos?.CardPosData
  )?.map((cardPosData: any) => {
    return {
      name: `${cardPosData.Pos_Name} - ${
        cardPosData.Pos_Type === 1 ? "Card" : "QR"
      }`,
      value: cardPosData.Id,
    };
  });

  let exists: boolean;

  //handle show Modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //handle add more modal
  const handleAddMoreModal = () => {
    setShowAddMoreModal(true);
  };

  //handle close add more modal
  const handleCloseAddMoreModal = () => {
    setShowAddMoreModal(false);
  };

  //collapsible open state
  const [showAddInfoForm, setOpenAddInfoForm] = useState<boolean>(false);

  //handle collapsible data
  const handleCollapsibleForm = () => {
    setOpenAddInfoForm(true);
  };

  //transaction grand total validation
  const [isTransactionValid, setIsTransactionValid] = useState<boolean>(true);

  //date states
  const [readingDate, setReadingDate] = useState<Dayjs | null>(null);
  const [readingDateError, setReadingDateError] =
    useState<DateValidationError | null>(null);

  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  //handle reading date
  const handleReadingDate = (newValue?: Dayjs) => {
    setReadingDate(newValue || null);
    if (newValue === null) {
      setReadingDateError("invalidDate");
    } else {
      if (dayjs(newValue).format("YYYY-MM-DD") < financialYear[0]?.Fin_start) {
        setReadingDateError("minDate");
      } else if (
        dayjs(newValue).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setReadingDateError("maxDate");
      } else setReadingDateError(null);
    }
  };

  //handle reading date error
  const handleReadingDateError = (newError?: DateValidationError | null) => {
    setReadingDateError(newError || null);
    if (readingDate === null) {
      setReadingDateError("invalidDate");
    } else {
      if (
        dayjs(readingDate).format("YYYY-MM-DD") < financialYear[0]?.Fin_start
      ) {
        setReadingDateError("minDate");
      } else if (
        dayjs(readingDate).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setReadingDateError("maxDate");
      } else setReadingDateError(null);
    }
  };

  //error Message function
  const [errorMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    if (readingDateError === "invalidDate")
      setErrMessage(text.errors.patternErrors.meterOpening.invalidDate);
    else if (readingDateError === "minDate" || readingDateError === "maxDate")
      setErrMessage(text.errors.patternErrors.meterOpening.rangeDate);
    else setErrMessage("");
  }, [readingDateError]);

  //calculate meter reading grand total
  const calculateMeterReadingGrandTotal = () => {
    let total = 0;
    meterReading.forEach((data: any) => {
      total += parseFloat(data.totalAmount);
    });
    setMeterReadingGrandTotal(parseFloat(total.toString()));
  };

  //calculate gst grand total
  const calculaterGstGrandTotal = () => {
    let total = 0;
    gstTable.forEach((data: any) => {
      total += parseFloat(data.totalAmount);
    });

    setGstGrandTotal(parseFloat(total.toString()));
  };

  // calculate bank transaction grand total
  const calculateBankTransactionTotal = () => {
    let total = 0;

    bankTransactionData.forEach((data: any) => {
      total += parseFloat(data.amount);
    });

    setBankTransactionTotal(parseFloat(total.toString()));
  };

  useEffect(() => {
    if (bankTransactionData.length > 0) {
      calculateBankTransactionTotal();
    }
  }, [bankTransactionData]);

  // reading date add formik
  const addMeterReadingFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      shift: "",
      pump: "",
      nozzle: "",
      staff: "",
    },
    validationSchema: Yup.object().shape({
      shift: Yup.string().required(
        text.errors.requiredErrors.meterReading.shiftName
      ),
      pump: Yup.string().required(
        text.errors.requiredErrors.meterReading.pumpName
      ),
      nozzle: Yup.string().required(
        text.errors.requiredErrors.meterReading.nozzleName
      ),
      staff: Yup.string().required(
        text.errors.requiredErrors.meterReading.staffName
      ),
    }),
    onSubmit: (values) => {
      if (readingDate !== null) {
        if (
          dayjs(readingDate).format("YYYY-MM-DD") >
            financialYear[0]?.Fin_start ||
          dayjs(readingDate).format("YYYY-MM-DD") < financialYear[0]?.Fin_To
        ) {
          const data = {
            ...values,
            readingDate: dayjs(readingDate).format("YYYY-MM-DD"),
          };

          for (let i = 0; i < meterReading.length; i++) {
            if (
              meterReading[i].pump === data.pump &&
              meterReading[i].nozzle === data.nozzle
            ) {
              exists = true;
            } else {
              exists = false;
            }
          }

          if (exists) {
            toast.error("Please enter a different data!!!");
          } else {
            getReadingApiCall(orgId, data);
          }
          setIsDisabled(true);
        } else {
          setReadingDateError("minDate");
        }
      } else {
        setReadingDateError("invalidDate");
      }
    },
  });

  const pumpId = Number(addMeterReadingFormik.values.pump);

  const isNozzleIdExists = nozzleOptions.some(
    (el: any) => el.id === addMeterReadingFormik.values.nozzle
  );

  const handleNozzleChange = () => {
    if (!isNozzleIdExists) {
      addMeterReadingFormik.setFieldValue("nozzle", "");
    }
  };

  //add gst formik
  const addGSTFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName:
        meterReadingData && meterReadingData.length > 0
          ? meterReadingData[0].Item_Name
          : "",
      openingReading:
        meterReadingData && meterReadingData.length > 0
          ? meterReadingData[0].Opening_Read
          : 0,
      closingReading: 0,
      testing: 0,
      creditQuantity: 0,
      itemRate:
        meterReadingData && meterReadingData.length > 0
          ? meterReadingData[0].Item_Rate
          : 0,
    },
    validationSchema: Yup.object().shape({
      itemName: Yup.string(),
      openingReading: Yup.number(),
      closingReading: Yup.number()
        .test(
          "greater-than-opening",
          text.errors.patternErrors.meterReading.closingReading.lessThan,
          (value: any, { parent }) => {
            return value > parent.openingReading;
          }
        )
        .moreThan(
          0,
          text.errors.patternErrors.meterReading.closingReading.moreThan
        )
        .required(text.errors.requiredErrors.meterReading.closingReading),
      testing: Yup.number()
        .moreThan(
          -1,
          text.errors.patternErrors.meterReading.testingNumber.positive
        )
        .test(
          "validate-testing",
          text.errors.patternErrors.meterReading.testingNumber.diffCheck,
          (value: any, { parent }) => {
            const difference = parent.closingReading - parent.openingReading;
            return value <= difference;
          }
        )
        .required(text.errors.requiredErrors.meterReading.testingNumber),
      creditQuantity: Yup.number()
        .test(
          "validate-credit-quantity",
          text.errors.patternErrors.meterReading.creditQuantity.diffCheck,
          (value: any, { parent }) => {
            const difference =
              parent.closingReading - parent.openingReading - parent.testing;
            return value <= difference;
          }
        )
        .moreThan(
          -1,
          text.errors.patternErrors.meterReading.creditQuantity.positive
        )
        .required(text.errors.requiredErrors.meterReading.creditQuantity),
      itemRate: Yup.number(),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values)

      setMeterReading((prev: any) => [
        ...prev,
        {
          shift: addMeterReading.shift,
          pump: addMeterReading.pump,
          nozzle: addMeterReading.nozzle,
          staff: addMeterReading.staff,
          readingDate: addMeterReading.readingDate,
          itemName: values.itemName,
          openingReading: values.openingReading,
          closingReading: values.closingReading,
          testing: values.testing,
          creditQuantity: values.creditQuantity,
          itemRate: values.itemRate,
          itemId: meterReadingData[0].Item_Id,
          totalAmount:
            values.openingReading === 0.0
              ? (values.closingReading -
                  values.testing -
                  values.creditQuantity) *
                values.itemRate
              : (values.closingReading -
                  values.openingReading -
                  values.testing -
                  values.creditQuantity) *
                values.itemRate,
        },
      ]);
      handleCloseModal();
      handleAddMoreModal();
      resetForm();
      toast.success("Meter reading added successfully");
    },
  });

  // add info formik
  const addInfoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: "",
      itemQuantity: 0,
      itemRate: 0,
    },
    validationSchema: Yup.object().shape({
      item: Yup.string().required(
        text.errors.requiredErrors.meterReading.itemName
      ),
      itemQuantity: Yup.number()
        .positive(text.errors.patternErrors.meterReading.itemQuantity)
        .required(text.errors.requiredErrors.meterReading.itemQuantity),
      itemRate: Yup.number()
        .positive(text.errors.patternErrors.meterReading.itemRate)
        .required(text.errors.requiredErrors.meterReading.itemRate),
    }),
    onSubmit: (values, { resetForm }) => {
      getGstApiCall(orgId, values, resetForm);
    },
  });

  //transaction details formik
  const transactionBankingForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      cardPos: "",
      amount: 0,
    },
    validationSchema: Yup.object().shape({
      cardPos: Yup.string().required(
        text.errors.requiredErrors.meterReading.transactionBanking.cardPos
      ),
      amount: Yup.number()
        .moreThan(
          -1,
          text.errors.patternErrors.meterReading.transactionBanking.amount
        )
        .required(
          text.errors.requiredErrors.meterReading.transactionBanking.amount
        )
        .test(
          "is-greater-than-amount-to-be-paid",
          `Total amount must be less than or equal to ${Number(grandTotal)}`,
          (value) =>
            value <=
            Number(Math.floor(grandTotal)) -
              Number(bankTransactionTotal) -
              Number(cashTransactionGrandTotal)
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const cardPos = cardPosOptions?.filter(
        (data: any) => data.value === values.cardPos
      )[0]?.name;
      setBankTransactionData((prev: any) => [
        ...prev,
        {
          cardPosId: values.cardPos,
          amount: values.amount,
          cardPos: cardPos,
        },
      ]);
      toast.success("Bank amount added successfully");
      resetForm();
    },
  });

  //resetForm data
  const handleResetForm = () => {
    addMeterReadingFormik.resetForm();
    addGSTFormik.resetForm();
    addInfoForm.resetForm();
    transactionBankingForm.resetForm();

    setOpenAddInfoForm(false);
    setMeterReading([]);
    setGstTable([]);
    setIsDisabled(false);
    setFinalAmountDiff(0);
    getNoteDenomApiCall();
    setIsTransactionValid(true);
    setGstGrandTotal(0);
    setActiveSteps(0);
    setCashTransactionGrandTotal(0);
    setGrandTotal(0);
    setDecimal(0);
    setDecimalInput(0);
    setDecimalInputError("");
    setCashDenomArray([]);
    setBankTransactionData([]);
    setBankTransactionTotal(0);
    setMeterReadingGrandTotal(0);
    setReadingDate(null);
    setReadingDateError(null);
    setErrMessage("");
    setCalculateCheck(false);
  };

  // delete meter reading data function
  const handleDeleteMeterReadingData = (id: number) => {
    const newMeterReadingList = meterReading.filter(
      (data: any, index: number) => index !== id
    );
    if (newMeterReadingList.length === 0) {
      handleResetForm();
    } else {
      setMeterReading([...newMeterReadingList]);
    }
  };

  // delete meter reading data function
  const handleDeleteAdditionalItemData = (id: number) => {
    const newGstTable = gstTable.filter(
      (data: any, index: number) => index !== id
    );

    setGstTable([...newGstTable]);
  };

  //get reading data api Call
  const getReadingApiCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      Nozzle_Id: item.nozzle,
      Read_Date: item.readingDate,
      org_id: orgId,
    };
    postMeterReadingData(bodyData, "reading")
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          toast.success("Reading data fetched successfully");
          // setEditData(null)
          handleShowModal();
          dispatch(getMeterReadingData(res.Data));
          setAddMeterReading(item);
        } else {
          toast.error(res.message);
          dispatch(getMeterReadingData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getMeterReadingData([]));
        setPostLoaders(false);
      })
      .finally(() => {
        setPostLoaders(false);
      });
  };

  //get gst api call
  const getGstApiCall = async (orgId: number, item: any, resetForm: any) => {
    setPostGstLoaders(true);
    let bodyData = {
      Item_Id: item.item,
      Read_Date: addMeterReading.readingDate,
      Item_Rate: item.itemRate,
      Item_Qnty: item.itemQuantity,
      org_id: orgId,
    };
    postMeterReadingData(bodyData, "gst")
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          toast.success("GST fetched successfully");

          console.log(res.Data[0]);

          setGstTable((prev: any) => [
            ...prev,
            {
              itemId: res.Data[0].Item_Id,
              itemName: res.Data[0].Item_Name,
              itemRateTable: item.itemRate,
              itemRate: res.Data[0].Item_Rate,
              itemQnty: item.itemQuantity,
              cgst: res.Data[0].Item_CGST,
              sgst: res.Data[0].Item_SGST,
              igst: res.Data[0].Item_IGST,
              roundOff: res.Data[0].Item_Round_Amt,
              totalAmount: res.Data[0].Item_Tot_Amt,
              grossAmount: res.Data[0].Item_Gross_Amt,
            },
          ]);

          resetForm();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        setPostGstLoaders(false);
      })
      .finally(() => {
        setPostGstLoaders(false);
      });
  };

  //note denom master get api call
  const getNoteDenomApiCall = async () => {
    setLoading(true);
    getNoteDenomApi()
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getNoteDenom(res.Data));
          const defaultDenominators = Array(res.Data.length).fill("");
          setDenominators(defaultDenominators);
          // Initialize total amounts array with default values
          const defaultTotalAmounts = Array(res.Data.length).fill(0);
          setCashTransactionTotal(defaultTotalAmounts);
        } else {
          dispatch(getNoteDenom([]));
        }
      })
      .catch((err: any) => {
        toast.error("Something went wrong");
        console.error(err);
        dispatch(getNoteDenom([]));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle denominators change
  const handleDenominatorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const { value } = event.target;
    const newDenominators = [...denominators];

    if (Number(value) > -1 && /^\d*$/.test(value)) {
      newDenominators[rowIndex] = value;
      setDenominators(newDenominators);
    }
  };

  //handle cash transaction grand total
  const calculateCashTransactionTotalAmount = (
    note: string,
    denominator: string
  ) => {
    const parsedNote = parseFloat(note);
    const parsedDenominators = parseFloat(denominator);
    if (!isNaN(parsedNote) && !isNaN(parsedDenominators)) {
      return parsedNote * parsedDenominators;
    }
    return 0;
  };

  useEffect(() => {
    const newTotalAmounts = cashDenomData.map((cash: any, index: number) =>
      calculateCashTransactionTotalAmount(cash.Note_Value, denominators[index])
    );
    setCashTransactionTotal(newTotalAmounts);
  }, [denominators, cashDenomData]);

  useEffect(() => {
    // Calculate cash grand total
    const newGrandTotal = cashTransactionTotal.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setCashTransactionGrandTotal(newGrandTotal);
  }, [cashTransactionTotal]);

  useEffect(() => {
    setGrandTotal(meterReadingGrandTotal + gstGrandTotal);
  }, [meterReadingGrandTotal, gstGrandTotal]);

  useEffect(() => {
    const decimalTobePaid = grandTotal - bankTransactionTotal;

    const decimalPart = decimalTobePaid.toString().includes(".")
      ? Number(grandTotal.toString().split(".")[1]) /
        10 ** grandTotal.toString().split(".")[1].length
      : 0;

    setDecimal(parseFloat(decimalPart.toFixed(2)));
  }, [grandTotal, bankTransactionTotal]);

  //handle post table data
  const handlePostTableData = () => {
    console.log(meterReading);
    console.log(gstTable);
    setActiveSteps(1);
    // handleResetForm();
  };

  useEffect(() => {
    setFinalAmountDiff(
      grandTotal - bankTransactionTotal - cashTransactionGrandTotal
    );
  }, [
    bankTransactionTotal,
    cashTransactionGrandTotal,
    grandTotal,
    setFinalAmountDiff,
  ]);

  //cash denom array
  useEffect(() => {
    let postData = cashDenomData.map((cashDenom: any, idx: number) => {
      return {
        note_id: cashDenom.Id,
        denominator: parseInt(denominators[idx]) || 0,
        totalAmount: cashTransactionTotal[idx],
      };
    });
    setCashDenomArray(postData);
  }, [denominators, cashTransactionTotal]);

  // useEffect(() => {
  //   const isNotPositiveNumber = (str: string) => {
  //     if (str.length === 0) return false;
  //     const num = parseFloat(str);
  //     return isNaN(num) || num <= 0;
  //   };

  //   let errorArray: number[] = denominators.reduce(
  //     (acc: number[], str: string, index: number) => {
  //       if (isNotPositiveNumber(str)) {
  //         acc.push(index);
  //       }
  //       return acc;
  //     },
  //     []
  //   );
  //   setCashDenomError([...errorArray]);
  // }, [denominators]);

  const handleCalculateDecimalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      Number(e.target.value) !== decimal * -1 &&
      Number(e.target.value) !== parseFloat((1 - decimal).toFixed(2))
    ) {
      setDecimalInputError(
        `This Value should be equal to -${decimal} or ${parseFloat(
          (1 - decimal).toFixed(2)
        )}`
      );
    } else {
      setDecimalInputError("");
    }
    // console.log(Number(e.target.value), decimal);

    setDecimalInput(Number(e.target.value));
  };

  useEffect(() => {
    if (calculateCheck) {
      if (decimal < 0.5) {
        setDecimalInput(decimal * -1);
      } else {
        setDecimalInput(parseFloat((1 - decimal).toFixed(2)));
      }
    } else {
      setDecimalInput((prev: number) => prev);
    }
  }, [calculateCheck]);

  const handleDeleteBankTransactionData = (data: any) => {
    // console.log("data", data);
    // console.log("All", bankTransactionData);

    let newBankTransanctionData = bankTransactionData.filter(
      (tdata: any, id: number) => id !== data
    );
    // console.log("new", newBankTransanctionData);
    setBankTransactionData([...newBankTransanctionData]);
    toast.success("Bank amount deleted successfully");

    if (newBankTransanctionData.length === 0) setBankTransactionTotal(0);
  };

  const handleCalculateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalculateCheck(event.target.checked);
    // console.log(event.target.checked);
  };

  const handleTransactionPost = async () => {
    setPostFinalLoaders(true);
    let bodyData = {
      pRead_Date: meterReading[0].readingDate,
      pShift_Id: meterReading[0].shift,
      pSTaff_Id: meterReading[0].staff,
      pExces_Amt: finalAmountDiff - decimalInput,
      pNet_Round: decimalInput,
      pMeter_Read_Data: meterReading,
      pAdd_Item_Data: gstTable,
      pCash_Data: cashDenomArray.map((item: any) => {
        return {
          noteId: item.note_id,
          denominator: item.denominator,
          totalAmount: item.totalAmount,
        };
      }),
      pBank_Data: bankTransactionData,
      org_id: orgId,
    };
    postProcessMeterReadData(bodyData)
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          toast.success(res.message);
          handleResetForm();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        setPostFinalLoaders(false);
      })
      .finally(() => {
        setPostFinalLoaders(false);
      });
  };

  return {
    addMeterReadingFormik,
    handleReadingDate,
    errorMessage,
    showModal,
    handleReadingDateError,
    pumpId,
    addGSTFormik,
    readingDate,
    orgId,
    token,
    handleNozzleChange,
    addInfoForm,
    handleCollapsibleForm,
    showAddInfoForm,
    handleCloseAddMoreModal,
    showAddMoreModal,
    isDisabled,
    meterReading,
    postLoaders,
    postGstLoaders,
    gstTable,
    meterReadingGrandTotal,
    calculateMeterReadingGrandTotal,
    handlePostTableData,
    calculaterGstGrandTotal,
    gstGrandTotal,
    handleDeleteMeterReadingData,
    handleDeleteAdditionalItemData,
    activeSteps,
    bankTransactionData,
    bankTransactionTotal,
    transactionBankingForm,
    calculateBankTransactionTotal,
    getNoteDenomApiCall,
    handleDenominatorChange,
    denominators,
    cashTransactionTotal,
    cashTransactionGrandTotal,
    loading,
    handleDeleteBankTransactionData,
    handleTransactionPost,
    isTransactionValid,
    setActiveSteps,
    grandTotal,
    decimal,
    decimalInput,
    handleCalculateDecimalChange,
    decimalInputError,
    setFinalAmountDiff,
    finalAmountDiff,
    handleCalculateCheck,
    calculateCheck,
    postFinalLoaders,
  };
};
