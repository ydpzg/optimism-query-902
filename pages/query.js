import { getTopGame } from "../util/api";
import { useQuery } from "react-query";
import { queryOption } from "../util/query-option";

const Query = () => {
  const { data } = useQuery([ 'getTopGame' ],
    async () => {
      return await getTopGame()
    },
    queryOption
  )

  console.log("data", data)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {data?.status || "init"}
    </div>
  )
}

export default Query
