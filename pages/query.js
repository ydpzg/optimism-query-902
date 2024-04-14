import { Card, Skeleton, Typography } from "antd";
import TitleAndBack from "../component/TitleAndBack";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import ReactECharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getOptimismWalletStatus, getOptimismWalletToken } from "../util/api";
import { queryOption } from "../util/query-option";

const Query = () => {
  const router = useRouter()
  const wallet = router?.query?.wallet
  console.log("wallet", wallet)
  const walletStatusResult = useQuery([ 'getOptimismWalletStatus' ],
    async () => {
      return await getOptimismWalletStatus(wallet)
    },
    {...queryOption, enabled: !!wallet }
  )
  const walletTokenResult = useQuery([ 'getOptimismWalletToken' ],
    async () => {
      return await getOptimismWalletToken(wallet)
    },
    {...queryOption, enabled: !!wallet }
  )
  const isLoading = false


  function transformData(data) {
    if (!data) {
      return null
    }
    // 从data中获取rows和cols
    const { rows, cols } = data;
    // 映射cols数组，创建key-value对象
    return rows.map(r => {
      return cols.map((col, index) => {
        return { key: col.name, value: r[index] };
      });
    })
  }


  const transformeStatusData = transformData(walletStatusResult?.data);
  const transformedTokenData = transformData(walletTokenResult?.data);
  console.log(transformeStatusData);

  const renderWalletStatus = (data) => {
    return (
      <div className="flex flex-col">
        <Typography.Text className="text-xl p-4">Overview</Typography.Text>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full flex-wrap">
            {_.get(data, "0")?.filter(i => [ "transaction_count", "contract_count" ].includes(i.key)).map((item) => {
              return (
                <Card className="flex justify-center items-center" key={item.key}
                      style={{ flex: "1 1 calc(33.333% - 10px)" }}>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl text-gray-400">{_.startCase(_.toLower(item.key))}</h2>
                    <h1 className="text-2xl">
                      {item.value}
                    </h1>
                  </div>
                </Card>
              )
            })}
          </div>
          <div className="flex flex-col gap-2 w-full flex-wrap">
            {_.get(data, "0")?.filter(i => [ "active_count_days", "active_count_weeks", "active_count_months" ].includes(i.key)).map((item) => {
              return (
                <Card className="flex justify-center items-center" key={item.key}
                      style={{ flex: "1 1 calc(33.333% - 10px)" }}>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl text-gray-400">{_.startCase(_.toLower(item.key))}</h2>
                    <h1 className="text-2xl">
                      {item.value}
                    </h1>
                  </div>
                </Card>
              )
            })}
          </div>
          <div className="flex flex-col gap-2 w-full flex-wrap">
            {_.get(data, "0")?.filter(i => [ "oldest_block_date", "newest_block_date" ].includes(i.key)).map((item) => {
              return (
                <Card className="flex justify-center items-center" key={item.key}
                      style={{ flex: "1 1 calc(33.333% - 10px)" }}>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl text-gray-400">{_.startCase(_.toLower(item.key))}</h2>
                    <h1 className="text-2xl">
                      {item.value?.replace('T', ' ')?.replace('Z', '')}
                    </h1>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const formatAddress = (data) => {
    return data?.slice(0, 6) + "..." + data?.slice(-4)
  }

  const renderWalletToken = (data) => {
    return (
      <div className={"flex flex-col"}>
        <Typography.Text className="text-xl p-4">Token (30D)</Typography.Text>
        <div className="flex gap-4" style={{ height: 500 }}>
          <ReactECharts
            lazyUpdate={true}
            theme={"dark"}
            onEvents={{
              click: (params) => {
              },
            }}
            style={{ height: '100%', width: '100%' }}
            option={{
              title: {
                text: 'Token Buy Top Amount',
                right: '5%'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '50%',
                  data: data?.filter(i => i.find(j => j.key === "amount_raw").value > 0)?.map(i => {
                      return {
                        value: i.find(j => j.key === "amount_raw").value,
                        name: formatAddress(i.find(j => j.key === "token_address").value)
                      }
                    }
                  ),
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}
          />
          <ReactECharts
            lazyUpdate={true}
            theme={"dark"}
            onEvents={{
              click: (params) => {
              },
            }}
            style={{ height: '100%', width: '100%' }}
            option={{
              title: {
                text: 'Token Sell Top Amount',
                right: '5%'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '50%',
                  data: data?.filter(i => i.find(j => j.key === "amount_raw").value < 0)?.map(i => {
                      return {
                        value: -i.find(j => j.key === "amount_raw").value,
                        name: formatAddress(i.find(j => j.key === "token_address").value)
                      }
                    }
                  ),
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col p-24 " style={{ width: "100%", margin: "0 auto" }}>
      <TitleAndBack title="Scan Another Wallet"/>
      {walletStatusResult?.isLoading || walletTokenResult?.isLoading ? (<Skeleton active/>) :
        (
          <div className="flex flex-col">
            <div className="flex gap-4 items-baseline text-gray-400 my-4">
              Wallet Address: <Link className="text-2xl text-white underline" target="_blank"
                                    href={`https://optimistic.etherscan.io/address/${wallet}`}>{wallet}</Link>
            </div>
            {renderWalletStatus(transformeStatusData)}
            {renderWalletToken(transformedTokenData)}
          </div>
        )}

    </div>
  )
}

export default Query
