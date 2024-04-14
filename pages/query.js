import { Card, Skeleton, Table, Typography } from "antd";
import TitleAndBack from "../component/TitleAndBack";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import ReactECharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getOptimismWalletStatus, getOptimismWalletToken, getOptimismWalletTransaction } from "../util/api";
import { queryOption } from "../util/query-option";
import { formatUTCTime, getTimeAgo } from "../util/format";

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
  const walletTokenTransactionResult = useQuery([ 'getOptimismWalletTransaction' ],
    async () => {
      return await getOptimismWalletTransaction(wallet)
    },
    {...queryOption, enabled: !!wallet }
  )

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

  function transformData2(data) {
    if (!data) {
      return null
    }
    // 从data中获取rows和cols
    const { rows, cols } = data;
    // 映射cols数组，创建key-value对象
    const temp = rows.map(r => {
      return cols.map((col, index) => {
        return { key: col.name, value: r[index] };
      });
    })
    const transformedArray = _.map(temp, obj => {
      return _.fromPairs(_.map(obj, obj2 => [obj2.key, obj2.value]))
    });
    return transformedArray
  }


  const transformedStatusData = transformData(walletStatusResult?.data);
  const transformedTokenData = transformData(walletTokenResult?.data);
  const transformedTransactionData = transformData2(walletTokenTransactionResult?.data);

  const renderWalletStatus = (data) => {
    return (
      <div className="flex flex-col">
        <Typography.Text className="text-xl p-4">Overview</Typography.Text>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full flex-wrap">
            {_.get(data, "0")?.filter(i => [ "transaction_count", "contract_count" ].includes(i.key))?.map((item) => {
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
            {_.get(data, "0")?.filter(i => [ "active_count_days", "active_count_weeks", "active_count_months" ].includes(i.key))?.map((item) => {
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
            {_.get(data, "0")?.filter(i => [ "oldest_block_date", "newest_block_date" ].includes(i.key))?.map((item) => {
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
    if (!data) {
      return null
    }
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
                text: 'Token In Top Amount',
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
                text: 'Token Out Top Amount',
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

  const renderWalletTransaction = (data) => {
    if (!data) {
      return null
    }

    const columns = [
      {
        title: 'Hash',
        dataIndex: 'hash',
        key: 'hash',
        render: (text) => <Link className="underline" href={`https://optimistic.etherscan.io/tx/${text}`}>{formatAddress(text) || "--"}</Link>,
      },
      {
        title: 'From Address',
        dataIndex: "from_address",
        key: "from_address",
        render: (text) => <Link className="underline" href={`https://optimistic.etherscan.io/address/${text}`}>{formatAddress(text) || "--"}</Link>,
      },
      {
        title: 'To Address',
        dataIndex: "to_address",
        key: "to_address",
        render: (text) => <Link className="underline" href={`https://optimistic.etherscan.io/address/${text}`}>{formatAddress(text) || "--"}</Link>,
      },
      {
        title: 'Block Number',
        dataIndex: "block_number",
        key: "block_number",
      },
      {
        title: 'Value',
        dataIndex: "value",
        key: "value",
      },
      {
        title: 'Gas',
        dataIndex: "gas",
        key: "gas",
      },
      {
        title: 'Timestamp',
        dataIndex: "block_timestamp",
        key: "block_timestamp",
        render: (text) => <div>{getTimeAgo(Date.parse(text))} ({formatUTCTime(Date.parse(text) / 1000)})</div>,
      },
    ];
    return (
      <div className={"flex flex-col"}>
        <Typography.Text className="text-xl p-4">Transactions (7D)</Typography.Text>

        <Table dataSource={data} columns={columns} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col px-48 pt-8 " style={{ width: "100%", margin: "0 auto" }}>
      <TitleAndBack title="Scan other Wallet"/>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-baseline text-gray-400 my-4">
          Wallet Address: <Link className="text-2xl text-white underline" target="_blank"
                                href={`https://optimistic.etherscan.io/address/${wallet}`}>{wallet}</Link>
        </div>
        {walletStatusResult?.isLoading ?  (<Skeleton active/>) : renderWalletStatus(transformedStatusData)}
        {walletTokenResult?.isLoading ?  (<Skeleton  className="mt-20" active/>) : renderWalletToken(transformedTokenData)}
        {walletTokenTransactionResult?.isLoading ?  (<Skeleton  className="mt-20" active/>) : renderWalletTransaction(transformedTransactionData)}
      </div>
    </div>
  )
}

export default Query
