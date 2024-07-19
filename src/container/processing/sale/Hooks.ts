import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import text from "@/languages/en_US.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postItemData } from "./SaleApis";

export const SalesHooks = () => {
  const dispatch = useDispatch();
  const orgId = getSessionStorageData("orgId");
  const token = getSessionStorageData("token");
  //   const meterReadingData = useSelector(
  //     (state: any) => state.meterReading?.meterReadingData
  //   );

  //loaders
  const [loading, setLoading] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);
  const [postGstLoaders, setPostGstLoaders] = useState<boolean>(false);

  //disable states
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  //date states
  const [salesDate, setSalesDate] = useState<Dayjs | null>(null);
  const [salesDateError, setSalesDateError] =
    useState<DateValidationError | null>(null);

  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  //handle reading date
  const handleSalesDate = (newValue?: Dayjs) => {
    setSalesDate(newValue || null);
    if (newValue === null) {
      setSalesDateError("invalidDate");
    } else {
      if (dayjs(newValue).format("YYYY-MM-DD") < financialYear[0]?.Fin_start) {
        setSalesDateError("minDate");
      } else if (
        dayjs(newValue).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setSalesDateError("maxDate");
      } else setSalesDateError(null);
    }
  };

  //handle reading date error
  const handleSalesDateError = (newError?: DateValidationError | null) => {
    setSalesDateError(newError || null);
    if (salesDate === null) {
      setSalesDateError("invalidDate");
    } else {
      if (dayjs(salesDate).format("YYYY-MM-DD") < financialYear[0]?.Fin_start) {
        setSalesDateError("minDate");
      } else if (
        dayjs(salesDate).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setSalesDateError("maxDate");
      } else setSalesDateError(null);
    }
  };

  //error Message function
  const [errorMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    if (salesDateError === "invalidDate")
      setErrMessage(text.errors.patternErrors.meterOpening.invalidDate);
    else if (salesDateError === "minDate" || salesDateError === "maxDate")
      setErrMessage(text.errors.patternErrors.sale.rangeDate);
    else setErrMessage("");
  }, [salesDateError]);

  const [soldToVal, setSoldToVal] = useState<string>("0");
  const [soldToError, setSoldToError] = useState<string | null>(null);

  // customer error function
  const customerErrorMessage = useMemo(() => {
    switch (soldToError) {
      case "invalidCustomer": {
        return text.errors.patternErrors.sale.soldTo;
      }
      default: {
        return null;
      }
    }
  }, [soldToError]);

  //handle pos types
  const handleSoldTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSoldToVal((event.target as HTMLInputElement).value);
  };

  // sale data
  const [saleData, setSaleData] = useState<any>({});

  // aditional item table data
  const [itemTableData, setItemTableData] = useState<any>([]);
  const [itemTableGrandTotal, setItemTableGrandTotal] = useState<number>(0);

  // handle modal opening for sale info
  const [saleModalOpen, setSaleModalOpen] = useState<boolean>(false);

  // show add item form open
  const [showAddItemForm, setShowAddItemForm] = useState<boolean>(false);

  // payment method option
  const [paymentOption, setPaymentOption] = useState<string>("0");

  // show payment method form
  const [showPaymentMethodForm, setShowPaymentMethodForm] =
    useState<boolean>(false);

  // show payment method modal
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // denominators
  const [inDenominators, setInDenominators] = useState<string[]>([]);
  const [outDenominators, setOutDenominators] = useState<string[]>([]);

  // cash Transaction Total
  const [cashInTransactionTotal, setCashInTransactionTotal] = useState<
    number[]
  >([]);
  const [cashOutTransactionTotal, setCashOutTransactionTotal] = useState<
    number[]
  >([]);

  const [cashInTransactionGrandTotal, setCashInTransactionGrandTotal] =
    useState<number>(0);

  const [cashOutTransactionGrandTotal, setCashOutTransactionGrandTotal] =
    useState<number>(0);

  const [cashInDenomArray, setCashInDenomArray] = useState<any>([]);
  const [cashOutDenomArray, setCashOutDenomArray] = useState<any>([]);

  // card pos option
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

  const cashDenomData = useSelector(
    (state: any) => state.meterReading?.noteDenom
  );

  // handle modal close function
  const handleCloseModal = () => {
    setSaleModalOpen(false);
  };

  useEffect(() => {
    if (soldToVal === "1" || soldToVal === "2") setSaleModalOpen(true);
  }, [soldToVal]);

  // reading date add formik
  const addSaleFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      soldBy: "",
    },
    validationSchema: Yup.object().shape({
      soldBy: Yup.string()
        .required(text.errors.requiredErrors.sale.soldBy)
        .min(1, text.errors.requiredErrors.sale.soldBy),
    }),
    onSubmit: (values) => {
      if (salesDate !== null) {
        if (soldToVal !== "0") {
          const data = {
            ...values,
            ...saleData,
            readingDate: dayjs(salesDate).format("YYYY-MM-DD"),
          };
          setSaleData({ ...data });
          console.log("data", data);
          setShowAddItemForm(true);
          // handleResetForm();

          // } else {
          //   getReadingApiCall(orgId, data);
          // }
          // setIsDisabled(true);
        } else {
          setSoldToError("invalidCustomer");
        }
      } else {
        setSalesDateError("invalidDate");
      }
    },
  });

  // add customerDetails formik
  const addPartyFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      partyId: "",
    },
    validationSchema: Yup.object().shape({
      partyId: Yup.number().required(
        text.errors.requiredErrors.sale.selectParty
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        ...saleData,
        soldTo: values.partyId,
      };
      setSaleData({ ...data });
      // console.log(data);
      handleCloseModal();
      // handleResetForm();
      // toast.success("Meter reading added successfully");
    },
  });

  const addNewPartyFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      custName: "",
      address: "",
      phone: "",
      email: "",
      gstIn: "",
    },
    validationSchema: Yup.object().shape({
      custName: Yup.string()
        .required(text.errors.requiredErrors.sale.custName)
        .min(3, text.errors.patternErrors.sale.custName),
      address: Yup.string()
        .required(text.errors.requiredErrors.sale.adddress)
        .min(3, text.errors.patternErrors.sale.adddress),
      phone: Yup.string()
        .required(text.errors.requiredErrors.sale.phone)
        .min(10, text.errors.patternErrors.sale.phone),
      email: Yup.string().email(),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        ...saleData,
        soldTo: { ...values },
      };
      setSaleData({ ...data });
      console.log(data);
      handleCloseModal();
      // handleResetForm();
      // toast.success("Meter reading added successfully");
    },
  });

  //calculate item table grand total
  const calculateItemTableGrandTotal = () => {
    let total = 0;

    itemTableData.forEach((data: any) => {
      total += parseFloat(data.totalAmount);
    });

    // console.log("data", total);

    setItemTableGrandTotal(parseFloat(total.toString()));
  };

  // add items formik
  const addItemFormik = useFormik({
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

  const getGstApiCall = async (orgId: number, item: any, resetForm: any) => {
    setPostGstLoaders(true);
    let bodyData = {
      Item_Id: item.item,
      Read_Date: saleData.readingDate,
      Item_Rate: item.itemRate,
      Item_Qnty: item.itemQuantity,
      org_id: orgId,
    };
    postItemData(bodyData)
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          toast.success("GST fetched successfully");

          setItemTableData((prev: any) => [
            ...prev,
            {
              itemId: res.Data[0].Item_Id,
              itemName: res.Data[0].Item_Name,
              itemRate: item.itemRate,
              itemQnty: item.itemQuantity,
              cgst: res.Data[0].Item_CGST,
              sgst: res.Data[0].Item_SGST,
              igst: res.Data[0].Item_IGST,
              roundOff: res.Data[0].Item_Round_Amt,
              totalAmount: res.Data[0].Item_Tot_Amt,
              grossAmount: res.Data[0].Item_Gross_Amt,
            },
          ]);
          setShowPaymentMethodForm(true);
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

  // handle payment option
  const handlePaymentOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentOption((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (paymentOption === "c" || paymentOption === "b")
      setShowPaymentModal(true);
    else setShowPaymentModal(false);
  }, [paymentOption]);

  // set denominators
  useEffect(() => {
    const defaultDenominators = Array(cashDenomData.length).fill("");
    setInDenominators(defaultDenominators);
    setOutDenominators(defaultDenominators);
    const defaultTotalAmounts = Array(cashDenomData.length).fill(0);
    setCashInTransactionTotal(defaultTotalAmounts);
    setCashOutTransactionTotal(defaultTotalAmounts);
  }, [cashDenomData]);

  //transaction details formik
  const transactionBankingForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      cardPos: "",
      amount: 0,
    },
    validationSchema: Yup.object().shape({
      cardPos: Yup.string().required(
        text.errors.requiredErrors.sale.transactionBanking.cardPos
      ),
      amount: Yup.number()
        .moreThan(-1, text.errors.patternErrors.sale.transactionBanking.amount)
        .required(text.errors.requiredErrors.sale.transactionBanking.amount)
        .test(
          "is-equal-to-total-amount",
          `The amount should be equal to ${itemTableGrandTotal}`,
          (value) => value === itemTableGrandTotal
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      const cardPos = cardPosOptions?.filter(
        (data: any) => data.value === values.cardPos
      )[0]?.name;
      console.log(cardPos);
      let data = {
        Sale_Details: saleData,
        Item_Details: itemTableData,
        Payment_Method: paymentOption,
        BankTransaction_Details: values,
      };

      console.log(data);
      toast.success("Bank amount added successfully");
      handleResetForm();
    },
  });

  // cash transaction details

  const handleCashTransactionPost = () => {
    let data = {
      Sale_Details: saleData,
      Item_Details: itemTableData,
      Payment_Method: paymentOption,
      CashIn_Details: cashInDenomArray,
      CashOut_Details: cashOutDenomArray,
    };
    console.log(data);
    handleResetForm();
  };
  // credit transaction details
  const handleCreditTransactionPost = () => {
    let data = {
      Sale_Details: saleData,
      Item_Details: itemTableData,
      Payment_Method: paymentOption,
    };
    console.log(data);
    handleResetForm();
  };

  //handle denominators change
  const handleInDenominatorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const { value } = event.target;
    // console.log(value);

    const newDenominators = [...inDenominators];
    if (Number(value) > -1) {
      newDenominators[rowIndex] = value;
    }
    setInDenominators(newDenominators);
  };

  const handleOutDenominatorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const { value } = event.target;
    // console.log(value);

    const newDenominators = [...outDenominators];
    if (Number(value) > -1) {
      newDenominators[rowIndex] = value;
    }
    setOutDenominators(newDenominators);
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
      calculateCashTransactionTotalAmount(
        cash.Note_Value,
        inDenominators[index]
      )
    );

    setCashInTransactionTotal(newTotalAmounts);
  }, [inDenominators, cashDenomData]);

  useEffect(() => {
    const newTotalAmounts = cashDenomData.map((cash: any, index: number) =>
      calculateCashTransactionTotalAmount(
        cash.Note_Value,
        outDenominators[index]
      )
    );

    setCashOutTransactionTotal(newTotalAmounts);
  }, [outDenominators, cashDenomData]);

  useEffect(() => {
    // Calculate grand total
    const newGrandTotal = cashInTransactionTotal.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setCashInTransactionGrandTotal(newGrandTotal);
  }, [cashInTransactionTotal]);

  useEffect(() => {
    // Calculate grand total
    const newGrandTotal = cashOutTransactionTotal.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setCashOutTransactionGrandTotal(newGrandTotal);
  }, [cashOutTransactionTotal]);

  useEffect(() => {
    let postData = cashDenomData.map((cashDenom: any, idx: number) => {
      return {
        note_id: cashDenom.Id,
        denominator: parseInt(inDenominators[idx]) || 0,
        totalAmount: cashInTransactionTotal[idx],
      };
    });
    setCashInDenomArray(postData);
  }, [inDenominators, cashInTransactionTotal]);

  useEffect(() => {
    let postData = cashDenomData.map((cashDenom: any, idx: number) => {
      return {
        note_id: cashDenom.Id,
        denominator: parseInt(outDenominators[idx]) || 0,
        totalAmount: cashOutTransactionTotal[idx],
      };
    });
    setCashOutDenomArray(postData);
  }, [outDenominators, cashOutTransactionTotal]);

  //resetForm data
  const handleResetForm = () => {
    const defaultDenominators = Array(cashDenomData.length).fill("");
    setInDenominators(defaultDenominators);
    setOutDenominators(defaultDenominators);
    addSaleFormik.resetForm();
    addPartyFormik.resetForm();
    addNewPartyFormik.resetForm();
    transactionBankingForm.resetForm();
    setItemTableData([]);
    setSalesDate(null);
    setSalesDateError(null);
    setSaleData({});
    setShowAddItemForm(false);
    setShowPaymentMethodForm(false);
    setShowPaymentModal(false);
    setItemTableGrandTotal(0);
    setCashInTransactionGrandTotal(0);
    setCashOutTransactionGrandTotal(0);
    setPaymentOption("0");
    setCashInDenomArray([]);
    setCashOutDenomArray([]);
    setSoldToVal("0");
    setIsDisabled(false);
    setSalesDate(null);
    setSalesDateError(null);
    setErrMessage("");
  };

  return {
    saleData,
    addSaleFormik,
    handleSoldTo,
    soldToVal,
    handleSalesDate,
    errorMessage,
    handleSalesDateError,
    customerErrorMessage,
    addPartyFormik,
    addNewPartyFormik,
    salesDate,
    orgId,
    token,
    addItemFormik,
    itemTableData,
    itemTableGrandTotal,
    calculateItemTableGrandTotal,
    isDisabled,
    postLoaders,
    loading,
    saleModalOpen,
    handleCloseModal,
    showAddItemForm,
    showPaymentMethodForm,
    paymentOption,
    handlePaymentOption,
    showPaymentModal,
    transactionBankingForm,
    inDenominators,
    outDenominators,
    cashInTransactionTotal,
    cashOutTransactionTotal,
    handleInDenominatorChange,
    handleOutDenominatorChange,
    cashInTransactionGrandTotal,
    cashOutTransactionGrandTotal,
    handleCashTransactionPost,
    handleCreditTransactionPost,
  };
};
