import { TableCommon } from "@/common";
import { Box } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import ItemMasterFormDrawer from "./ItemMasterFormDrawer";
import ItemMasterTable from "./ItemMasterTable";
import { notFound } from "next/navigation";
import { useSelector } from "react-redux";

interface ItemMasterProps {
  handleCloseDrawer(): void;
  handleOpenDrawer(): void;
  openItemMaster: boolean;
  AddItemMasterFormik: any;
  token: string;
  postLoaders: boolean;
  loader: boolean;
}

const tableData = [
  {
    si: 1,
    itemName: "diesel",
    itemUnit: 20,
  },
];

const ItemMaster: FC<ItemMasterProps> = ({
  handleCloseDrawer,
  handleOpenDrawer,
  openItemMaster,
  AddItemMasterFormik,
  token,
  postLoaders,
  loader,
}) => {
  const unitDropDownValue = useSelector(
    (state: any) => state.itemMasterData?.itemMasterUnit
  )?.map((data: any) => {
    return {
      name: data.Unit_Name,
      value: data.Id,
    };
  });

  const itemCatDropDownValue = useSelector(
    (state: any) => state.itemMasterData?.itemMasterCategory
  )?.map((data: any) => {
    return {
      name: data.Catagary_Name,
      value: data.Id,
    };
  });

  const itemData = useSelector(
    (state: any) => state.itemMasterData?.itemMasterData
  );

  const ledgerDropDownValue = useSelector(
    (state: any) => state.accountLedgerData?.accountLedgerData
  )?.map((data: any) => {
    return {
      name: data.Acct_Name,
      value: data.Id,
    };
  });

  if (!token) return notFound();
  // if (!token) return <>Hello</>;
  return (
    <Box className={`min-h-[90vh]`}>
      <TableCommon
        title={text.tableTitles.itemMaster}
        btnName={text.add.addItemMaster}
        titleTextCls={`font-bold text-black text-3xl`}
        titleCls="mb-5"
        addComponent={
          <ItemMasterFormDrawer
            handleCloseDrawer={handleCloseDrawer}
            openItemMaster={openItemMaster}
            formik={AddItemMasterFormik}
            unitDropDownValue={unitDropDownValue}
            itemCatDropDownValue={itemCatDropDownValue}
            ledgerDropDownValue={ledgerDropDownValue}
            loading={postLoaders}
          />
        }
        handleOpenButton={handleOpenDrawer}
        tableComponent={
          <ItemMasterTable ItemDatas={itemData} loader={loader} />
        }
      />
    </Box>
  );
};
export default ItemMaster;
