import { Button } from "@/components/ui/button"
import HistoryList from "./_components/HistoryList"

function Dashboard() {
  return (
    <div className="flex justify-between items-center flex-col mt-10">
      <div className="flex justify-between items-center w-11/12">
        <h2 className="font-bold text-2xl">My Dashboard</h2>
        <Button>+ Consult with a doctor</Button>
      </div>
      <HistoryList />
    </div>
  )
}
export default Dashboard