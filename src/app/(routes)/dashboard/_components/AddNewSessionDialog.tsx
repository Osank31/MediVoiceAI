'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { suggestDoctors } from '@/helpers/GoogleAIResponse'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { DoctorAgent } from "./DoctorAgentCard";
import DoctorSuggestionCard from "./DoctorSuggestionCard";

function AddNewSessionDialog() {
    const [note, setNote] = useState('')
    const [suggestion, setSuggestion] = useState<DoctorAgent[] | null>(null)
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {
        const response = await axios.post('/api/get-doctor-sugesstion', { note })
        console.log(response.data)
        setSuggestion(response.data)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) {
                // Dialog closed - reset suggestion and note
                setSuggestion(null)
                setNote('')
            }
        }}>
            <DialogTrigger><Button className="mt-3">+ Start a consultation</Button></DialogTrigger>
            <DialogContent>
                {!suggestion ? (
                    <div>
                        <DialogHeader>
                            <DialogTitle>Add Basic Details</DialogTitle>
                            <DialogDescription asChild>
                                <div>
                                    <h2>Add Symptoms or any other details</h2>
                                    <Textarea 
                                        placeholder="Add details here..." 
                                        className="h-[200px] mt-1"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose><Button variant={'outline'}>Cancel</Button></DialogClose>
                            <Button
                                disabled={note.length === 0}
                                onClick={handleSubmit}
                            >
                                Next <ArrowRight />
                            </Button>
                        </DialogFooter>
                    </div>
                ) : (
                    <div className="flex gap-10 overflow-x-auto flex-nowrap">
                        {suggestion.map((doc, idx) => (
                            <div key={idx} className="flex-shrink-0">
                                <DoctorSuggestionCard docSugg={doc} />
                            </div>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog