import React from 'react'
import { ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { Tooltip, Typography } from 'antd'
import { useRouter } from "next/router";

const TitleAndBack = ({ title }) => {
  const router = useRouter()
  return (
    <div className="flex items-center mb-5 gap-4">
      <ArrowLeftOutlined
        className="px-2 mr-2"
        onClick={() => {
          if (window.history.length > 2) {
            router.back()
          } else {
            router.replace("/")
          }
        }}
        style={{ fontSize: 24 }}
      />
      <Typography.Text className="font-bold text-3xl ml-2">{title}</Typography.Text>
    </div>
  )
}

export default TitleAndBack
