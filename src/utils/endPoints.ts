const createApi = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`;
export const endPoints = {
  login: `${createApi}admin/login`,
  checkRateLogin: `${createApi}master/CheckRateOpen`,
  finYear: (id: number) => `${createApi}admin/finyear/${id}`,
  sideBarData: `${createApi}admin/dashboard`,
  getUnitMaster: (id: number) => `${createApi}master/GetUnit/${id}`,
  postUnitMaster: `${createApi}master/AddUnit`,
  updateUnitMaster: `${createApi}master/UpdateUnit`,
  getItemCategory: (id: number) => `${createApi}master/GetCatagary/${id}`,
  postItemCategory: `${createApi}master/AddCatagary`,
  updateItemCategory: `${createApi}master/UpdateCatagary`,
  getItemMasterUnit: (id: number) => `${createApi}master/DropDownUnit/${id}`,
  getItemMasterCategory: (id: number) => `${createApi}master/DropDownCat/${id}`,
  getItemMaster: (id: number) => `${createApi}master/GetItemList/${id}`,
  getAdditionalItemData: (id: number) =>
    `${createApi}master/GetOtherItem/${id}`,
  getRateItemMaster: (id: number) => `${createApi}master/getRateItem/${id}`,
  postItemMaster: `${createApi}master/AddItem`,
  getTankMaster: (id: number) => `${createApi}master/GetTank/${id}`,
  getTankItem: (id: number) => `${createApi}master/GetTankItem/${id}`,
  postTankMaster: `${createApi}master/AddTank`,
  updateTankMaster: `${createApi}master/UpdateTank`,
  getAccountHeadMain: (id: number) => `${createApi}master/GetAcctMain/${id}`,
  getAccountHead: (id: number) => `${createApi}master/GetAcctHead/${id}`,
  getAccountLedger: (id: number) => `${createApi}master/GetAcctLedg/${id}`,
  postAccountLedger: `${createApi}master/AddAcctLedg`,
  updateAccountLedger: `${createApi}master/UpdateAcctLedg`,
  postAccountHead: `${createApi}master/AddAcctHead`,
  updateAccountHead: `${createApi}master/UpdateAcctHead`,
  getPumpList: (id: number) => `${createApi}master/GetPumpList/${id}`,
  postPumpMaster: `${createApi}master/AddPump`,
  getShiftMaster: (id: number) => `${createApi}master/GetShift/${id}`,
  postShiftMaster: `${createApi}master/AddShift`,
  updateShiftMaster: `${createApi}master/UpdateShift`,
  getBankAccounts: (id: number) => `${createApi}master/GetBankAcct/${id}`,
  postBankAccounts: `${createApi}master/AddBankAcct`,
  updateBankAccounts: `${createApi}master/UpdateBankAcct`,
  getCardPos: (id: number) => `${createApi}master/GetCardPos/${id}`,
  getBankPos: (id: number) => `${createApi}master/GetBankPos/${id}`,
  postCardPos: `${createApi}master/AddCardPos`,
  updateCardPos: `${createApi}master/UpdateCardPos`,
  getCustomer: (id: number) => `${createApi}master/GetCustomer/${id}`,
  postCustomer: `${createApi}master/AddCustomer`,
  updateCustomer: `${createApi}master/UpdateCustomer`,
  getSupplier: (id: number) => `${createApi}master/GetSupplier/${id}`,
  postSupplier: `${createApi}master/AddSupplier`,
  updateSupplier: `${createApi}master/UpdateSupplier`,
  getTanker: (id: number) => `${createApi}master/GetTanker/${id}`,
  postTanker: `${createApi}master/AddTanker`,
  updateTanker: `${createApi}master/UpdateTanker`,
  getStaffType: (id: number) => `${createApi}master/GetStaffType/${id}`,
  getStaffDesignation: (id: number) =>
    `${createApi}master/GetStaffDesignation/${id}`,
  getStaff: (id: number) => `${createApi}master/GetStaff/${id}`,
  postStaff: `${createApi}master/AddStaff`,
  updateStaff: `${createApi}master/UpdateStaff`,
  getRate: (id: number) => `${createApi}master/GetItemRate/${id}`,
  postRate: `${createApi}master/AddItemRate`,
  updateRate: `${createApi}master/UpdateItemRate`,
  getMeterOpenings: (id: number) => `${createApi}master/GetOpenRead/${id}`,
  postMeterOpenings: `${createApi}master/PostOpenRead`,
  updateMeterOpenings: `${createApi}master/UpdateOpenRead`,
  getNozzle: (orgId: number, pumpId: number) =>
    `${createApi}master/GetNozzle/${orgId}/${pumpId}`,
  getReadingData: `${createApi}processing/GetReadingData`,
  getGstData: `${createApi}processing/GetGSTData`,
  getNoteDenom: `${createApi}master/getcashdenom`,
  postProcessMeterRead: `${createApi}processing/ProcessMeterRead`,
  getPetroliumItemRate: `${createApi}processing/getItemRate`,
  getCustomerDetails: (org_id: number, cust_id: number) =>
    `${createApi}master/GetCustDetails/${org_id}/${cust_id}`,
  logout: `${createApi}logout`,
};
