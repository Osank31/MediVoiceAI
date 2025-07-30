import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ViewReportDialog from "./ViewReportDialog"

function HistoryTable({ historyList }) {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SessionId</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead >View Report</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {historyList && historyList.length>0 && historyList.map((history, idx) =>(
                    <TableRow key={idx}>
                        
                        <TableCell className="font-medium">{`${history?.sessionId?.slice(0,10)}....`}</TableCell>
                        <TableCell>{'Complete'}</TableCell>
                        <TableCell>{history?.report?.chiefComplaint}</TableCell>
                        <TableCell>
                            <ViewReportDialog history={history}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default HistoryTable