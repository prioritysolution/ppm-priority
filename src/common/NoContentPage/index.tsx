import React from 'react'
import { FlexCenter } from '..'
import text from '@/languages/en_US.json'

type NoContentPageProps = {
  mainCls?: string,
  title?: string
}
const NoContentPage = (props: NoContentPageProps) => {
  return (
      <FlexCenter className={`w-full ${props.mainCls ? props.mainCls : 'h-[50vh]'}`}>
          {props.title ? props.title : text.noContentPage}
    </FlexCenter>
  )
}

export default NoContentPage
