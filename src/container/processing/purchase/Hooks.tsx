import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import text from "@/languages/en_US.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postItemData } from "../sale/SaleApis";

export const PurchaseHooks = () => {
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
  const [purchaseDate, setPurchaseDate] = useState<Dayjs | null>(null);
  const [purchaseDateError, setPurchaseDateError] =
    useState<DateValidationError | null>(null);

  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  const [errorMessage, setErrMessage] = useState<string>("");
  //handle reading date
  const handlePurchaseDate = (newValue?: Dayjs) => {
    setPurchaseDate(newValue || null);
    if (newValue === null) {
      setPurchaseDateError("invalidDate");
    } else {
      if (dayjs(newValue).format("YYYY-MM-DD") < financialYear[0]?.Fin_start) {
        setPurchaseDateError("minDate");
      } else if (
        dayjs(newValue).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setPurchaseDateError("maxDate");
      } else setPurchaseDateError(null);
    }
  };

  //handle reading date error
  const handlePurchaseDateError = (newError?: DateValidationError | null) => {
    setPurchaseDateError(newError || null);
    if (purchaseDate === null) {
      setPurchaseDateError("invalidDate");
    } else {
      if (
        dayjs(purchaseDate).format("YYYY-MM-DD") < financialYear[0]?.Fin_start
      ) {
        setPurchaseDateError("minDate");
      } else if (
        dayjs(purchaseDate).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setPurchaseDateError("maxDate");
      } else setPurchaseDateError(null);
    }
  };

  //error Message function

  useEffect(() => {
    if (purchaseDateError === "invalidDate")
      setErrMessage(text.errors.patternErrors.meterOpening.invalidDate);
    else if (purchaseDateError === "minDate" || purchaseDateError === "maxDate")
      setErrMessage(text.errors.patternErrors.purchase.rangeDate);
    else setErrMessage("");
  }, [purchaseDateError]);

  // const [soldToVal, setSoldToVal] = useState<string>("0");
  // const [soldToError, setSoldToError] = useState<string | null>(null);

  // customer error function
  // const customerErrorMessage = useMemo(() => {
  //   switch (soldToError) {
  //     case "invalidCustomer": {
  //       return text.errors.patternErrors.purchase.soldTo;
  //     }
  //     default: {
  //       return null;
  //     }
  //   }
  // }, [soldToError]);

  //handle pos types
  // const handleSoldTo = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSoldToVal((event.target as HTMLInputElement).value);
  // };

  // purchase data
  const [purchaseData, setPurchaseData] = useState<any>({});

  // aditional item table data
  const [itemTableData, setItemTableData] = useState<any>([]);
  const [itemTableGrandTotal, setItemTableGrandTotal] = useState<number>(0);

  // handle modal opening for purchase info
  const [purchaseModalOpen, setPurchaseModalOpen] = useState<boolean>(false);

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
    setPurchaseModalOpen(false);
  };

  // useEffect(() => {
  //   if (soldToVal === "1" || soldToVal === "2") setPurchaseModalOpen(true);
  // }, [soldToVal]);

  // reading date add formik
  const addPurchaseFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      partyId: "",
      soldBy: "",
    },
    validationSchema: Yup.object().shape({
      soldBy: Yup.string()
        .required(text.errors.requiredErrors.purchase.soldBy)
        .min(1, text.errors.requiredErrors.purchase.soldBy),
      partyId: Yup.number().required(
        text.errors.requiredErrors.purchase.selectParty
      ),
    }),
    onSubmit: (values) => {
      if (purchaseDate !== null) {
        const data = {
          // ...purchaseData,
          ...values,
          readingDate: dayjs(purchaseDate).format("YYYY-MM-DD"),
        };
        setPurchaseData({ ...data });
        console.log("data", data);
        setShowAddItemForm(true);
        // handleResetForm();

        // } else {
        //   getReadingApiCall(orgId, data);
        // }
        // setIsDisabled(true);
      } else {
        setPurchaseDateError("invalidDate");
      }
    },
  });

  // add customerDetails formik
  // const addPartyFormik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     partyId: "",
  //   },
  //   validationSchema: Yup.object().shape({
  //     partyId: Yup.number().required(
  //       text.errors.requiredErrors.purchase.selectParty
  //     ),
  //   }),
  //   onSubmit: (values, { resetForm }) => {
  //     const data = {
  //       ...purchaseData,
  //       soldTo: values.partyId,
  //     };
  //     setPurchaseData({ ...data });
  //     // console.log(data);
  //     handleCloseModal();
  //     // handleResetForm();
  //     // toast.success("Meter reading added successfully");
  //   },
  // });

  // const addNewPartyFormik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     custName: "",
  //     address: "",
  //     phone: "",
  //     email: "",
  //     gstIn: "",
  //   },
  //   validationSchema: Yup.object().shape({
  //     custName: Yup.string()
  //       .required(text.errors.requiredErrors.purchase.custName)
  //       .min(3, text.errors.patternErrors.purchase.custName),
  //     address: Yup.string()
  //       .required(text.errors.requiredErrors.purchase.adddress)
  //       .min(3, text.errors.patternErrors.purchase.adddress),
  //     phone: Yup.string()
  //       .required(text.errors.requiredErrors.purchase.phone)
  //       .min(10, text.errors.patternErrors.purchase.phone),
  //     email: Yup.string().email(),
  //   }),
  //   onSubmit: (values, { resetForm }) => {
  //     const data = {
  //       ...purchaseData,
  //       soldTo: { ...values },
  //     };
  //     setPurchaseData({ ...data });
  //     console.log(data);
  //     handleCloseModal();
  //     // handleResetForm();
  //     // toast.success("Meter reading added successfully");
  //   },
  // });

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
      Read_Date: purchaseData.readingDate,
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
        text.errors.requiredErrors.purchase.transactionBanking.cardPos
      ),
      amount: Yup.number()
        .moreThan(
          -1,
          text.errors.patternErrors.purchase.transactionBanking.amount
        )
        .required(text.errors.requiredErrors.purchase.transactionBanking.amount)
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
        Purchase_Details: purchaseData,
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
      Purchase_Details: purchaseData,
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
      Purchase_Details: purchaseData,
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
    addPurchaseFormik.resetForm();
    // addPartyFormik.resetForm();
    // addNewPartyFormik.resetForm();
    transactionBankingForm.resetForm();
    setItemTableData([]);
    setPurchaseDate(null);
    setPurchaseDateError(null);
    setPurchaseData({});
    setShowAddItemForm(false);
    setShowPaymentMethodForm(false);
    setShowPaymentModal(false);
    setItemTableGrandTotal(0);
    setCashInTransactionGrandTotal(0);
    setCashOutTransactionGrandTotal(0);
    setPaymentOption("0");
    setCashInDenomArray([]);
    setCashOutDenomArray([]);
    // setSoldToVal("0");
    setIsDisabled(false);
    setPurchaseDate(null);
    setPurchaseDateError(null);
    setErrMessage("");
  };

  return {
    // purchaseData,
    addPurchaseFormik,
    // handleSoldTo,
    // soldToVal,
    handlePurchaseDate,
    errorMessage,
    handlePurchaseDateError,
    // customerErrorMessage,
    // addPartyFormik,
    // addNewPartyFormik,
    purchaseDate,
    orgId,
    token,
    addItemFormik,
    itemTableData,
    itemTableGrandTotal,
    calculateItemTableGrandTotal,
    isDisabled,
    postLoaders,
    loading,
    purchaseModalOpen,
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
