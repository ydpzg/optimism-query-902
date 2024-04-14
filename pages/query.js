import { getTopGame } from "./util/api";
import { useQuery } from "react-query";

const Query = () => {
  const { data } = useQuery([ 'getTopGame' ], async () => {
    return await getTopGame()
  })

  console.log("data", data)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {data?.name || "init"}
    </div>
  )
}

export default Query
