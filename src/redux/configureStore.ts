"use client"
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import demoSlice from './demoReducer' // <--- Not for use, this is just an example
import navSlice from '@/container/Navbar/NavBarReducer'
import sideBarSlice from '@/container/Sidebar/SideBarReducer'
import unitMasterSlice from '@/container/master/UnitMaster/UnitMasterReducer'
import itemCategorySlice from '@/container/master/ItemCategory/ItemCategoryReducer'
import itemMasterSlice from '@/container/master/ItemMaster/itemMasterReducer'
import tankMasterSlice from '@/container/master/TankMaster/TankMasterReducer'
import shiftMasterSlice from '@/container/master/ShiftMaster/ShiftMasterReducer'
import pumpMasterSlice from '@/container/master/PumpMaster/PumpMasterReducer'
import AccountHeadSlice from '@/container/master/AccountHead/AccountHeadReducer'
import AccountLedgerSlice from '@/container/master/AccountLedger/AccountLedgerReducer'
import BankAccountSlice from '@/container/master/BankAccount/BankAccountReducer'
import CardPosSlice from '@/container/master/CardPos/CardPosAccountReducer'
import CustomerSlice from '@/container/master/Customer/CustomerReducer'
import supplierSlice from '@/container/master/Supplier/SupplierReducer'
import tankerSlice from '@/container/master/Tanker/TankerReducer' 
import staffSlice from '@/container/master/Staff/StaffReducer'
import rateSlice from '@/container/master/RateMaster/RateMasterReducer'
import meterOpeningSlice from '@/container/master/MeterOpening/MeterOpeningReducer'
import loginSlice from '@/container/Auth/Login/LoginReducer'
import meterReadingSlice from '@/container/processing/MeterReading/MeterReadingReducer'

export const store = configureStore({
    reducer: {
        abc: demoSlice, // <--- Not for use, this is just an example
        login: loginSlice,
        navbarData: navSlice,
        sideBarData: sideBarSlice,
        unitMasterData: unitMasterSlice,
        itemCategoryData: itemCategorySlice,
        itemMasterData: itemMasterSlice,
        tankMasterData: tankMasterSlice,
        shiftMasterData: shiftMasterSlice,
        pumpMasterData: pumpMasterSlice,
        accountHeadData: AccountHeadSlice,
        accountLedgerData: AccountLedgerSlice,
        bankAccountData: BankAccountSlice,
        cardPos: CardPosSlice,
        customer: CustomerSlice,
        supplier: supplierSlice,
        tanker: tankerSlice,
        staff: staffSlice,
        rate: rateSlice,
        meterOpening: meterOpeningSlice,
        meterReading: meterReadingSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});