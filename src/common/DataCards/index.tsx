"use client"
import { Card, Menu, MenuItem, Typography } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import { DropDownField, FlexBetween, FlexBox, FlexItemCenter } from '..'
import { BarChart, KeyboardArrowDown, List } from '@mui/icons-material'

interface selectOptionType {
  value: string,
  name: string
}
interface DataCardsProps {
  extraCls?: string,
  titleCls?: string,
  headerCls?: string,
  title?: string,
  istitle?: boolean,
  isSelectors: boolean,
  purchasedropDownRootCls?: string,
  drpMainCls?: string,
  purchaseDrpChange?(): void,
  purchaseSelectOption?: selectOptionType[],
  purchasePlaceholder?: string,
  allItemsDrpChange?(): void,
  allItemsselectOption?: selectOptionType[],
  allItemsdropDownRootCls?: string,
  allItemsPlaceholder?: string,
  mainTitleCls?: string,
  mainTitle?: string,
  graph: boolean,
  children: ReactNode,
  isNoGraph?: boolean,
  tableComponent: ReactNode,
  handleShowGraph(): void,
  handleShowData(): void
}

const DataCards: FC<DataCardsProps> = ({ extraCls, headerCls, titleCls,
  isSelectors, istitle, title, purchaseDrpChange, purchaseSelectOption, drpMainCls,
  purchasedropDownRootCls, purchasePlaceholder, allItemsDrpChange, allItemsselectOption, allItemsdropDownRootCls,
  allItemsPlaceholder, mainTitle, mainTitleCls, children, graph, isNoGraph, tableComponent, handleShowData, handleShowGraph
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Card className={extraCls}>
    <FlexItemCenter className={headerCls}>
      <FlexBetween className='w-full'>
        {
          istitle && <Typography className={titleCls} component={`p`}>
            {title}
          </Typography>
        }
        {
          isSelectors && <FlexItemCenter gap={2}>
            <DropDownField handleChange={purchaseDrpChange}
              selectOption={purchaseSelectOption} dropdownContainerCls={drpMainCls} dropDownRootCls={purchasedropDownRootCls}
              placeholder={purchasePlaceholder}
              fullWidthState
            />
            <DropDownField handleChange={allItemsDrpChange}
              selectOption={allItemsselectOption} dropdownContainerCls={drpMainCls} dropDownRootCls={allItemsdropDownRootCls}
              placeholder={allItemsPlaceholder}
              fullWidthState
            />
          </FlexItemCenter>
        }
        <FlexBox gap={2} className='hidden sm:flex md:flex lg:flex xl:flex max-xl:flex'>
          {!isNoGraph && <FlexItemCenter gap={1} className={`cursor-pointer h-full px-5`} onClick={handleShowGraph} >
            <BarChart fontSize='small' className={`${graph ? 'text-white' : ''}`}/>
            <Typography component={`p`} className={`${graph ? 'text-white' : ''} !font-semibold !text-sm`}>
              Graph
            </Typography>
          </FlexItemCenter>}
          <FlexItemCenter gap={1} className={`cursor-pointer h-full`} onClick={handleShowData}>
            <List fontSize='small' className={`${!graph ? 'text-white' : ''}`}/>
            <Typography component={`p`} className={`${!graph ? 'text-white' : ''} !font-semibold !text-sm`}>
              Data
            </Typography>
          </FlexItemCenter>
        </FlexBox>
        <FlexBox className={`flex sm:hidden md:hidden lg:hidden xl:hidden max-xl:hidden cursor-pointer`}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClick(event)}>
          <KeyboardArrowDown className={`!text-white`} fontSize='small' />
        </FlexBox>
      </FlexBetween>
    </FlexItemCenter>
    <Typography component={'p'} className={mainTitleCls}>
      {mainTitle}
    </Typography>
    {graph ?
      children :
      tableComponent
    }
    <Menu  id="responsivecard-menu" open={open} anchorEl={anchorEl} onClose={handleClose}   MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}>
    {!isNoGraph && 
      <MenuItem onClick={()=>{handleClose()
     typeof handleShowGraph === 'function' &&  handleShowGraph()
      }}>
        Graph
      </MenuItem>
      }
      <MenuItem onClick={()=>{handleClose()
        typeof handleShowData === 'function' && handleShowData()
      }}>
        Data
      </MenuItem>
    </Menu>
  </Card>
}

export default DataCards