import { Button } from "@/components/ui/button"
import HistoryList from "./_components/HistoryList"
import DoctorAgentsList from "./_components/DoctorAgentsList"
import AddNewSessionDialog from "./_components/AddNewSessionDialog"

function Dashboard() {
  return (
    <div className="flex justify-between items-center flex-col mt-10 mb-10 w-11/12">
      <div className="flex justify-between items-center flex-col w-11/12">

        <div className="flex justify-between items-center w-11/12">
          <h2 className="font-bold text-2xl">My Dashboard</h2>
          <AddNewSessionDialog/>
        </div>
        <HistoryList />
      </div>
      <div className="flex justify-center items-center w-11/12">
        <DoctorAgentsList />
      </div>
    </div>
  )
}
export default Dashboard