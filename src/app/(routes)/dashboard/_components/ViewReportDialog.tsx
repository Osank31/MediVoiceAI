import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function ViewReportDialog({ history }: { history: any }) {
    const { doctor, report } = history

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="link" className="text-blue-500 hover:underline">
                    View Report
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <h2 className="text-center text-2xl">Medical AI Voice Agent Report</h2>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="mt-6 space-y-4">
                            <div>
                                <h2 className="font-bold text-blue-500 text-lg">Doctor Info</h2>
                                <p><strong>Specialization:</strong> {doctor?.specialist}</p>
                                <p><strong>Description:</strong> {doctor?.description}</p>
                            </div>

                            {report ? (
                                <div>
                                    <h2 className="font-bold text-blue-500 text-lg mt-4">Report</h2>
                                    <p><strong>User:</strong> {report?.user}</p>
                                    <p><strong>Timestamp:</strong> {new Date(report?.timestamp).toLocaleString()}</p>
                                    <p><strong>Chief Complaint:</strong> {report?.chiefComplaint}</p>
                                    <p><strong>Summary:</strong> {report?.summary}</p>
                                </div>
                            ) : (
                                <p className="italic text-gray-500 mt-4">No report available.</p>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ViewReportDialog

// export default function ReportPage({ historyList }) {
//     return (
//         <div className="max-w-4xl mx-auto mt-10 p-4">
//             <h1 className="text-3xl font-bold mb-6">Patient History Reports</h1>
//             <ul className="space-y-6">
//                 {historyList.map((history) => (
//                     <li key={history.id} className="border rounded-lg p-4 shadow-sm">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="font-semibold text-lg">{history.doctor?.specialist}</h2>
//                                 <p className="text-sm text-gray-500">Session ID: {history.sessionId}</p>
//                             </div>
//                             <ViewReportDialog history={history} />
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }
