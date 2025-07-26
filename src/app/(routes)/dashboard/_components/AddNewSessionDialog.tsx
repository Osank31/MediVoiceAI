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

import {suggestDoctors} from '@/helpers/GoogleAIResponse'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";

function AddNewSessionDialog() {
    const [note, setNote]=useState('')
    return (
        <Dialog>
            <DialogTrigger><Button className="mt-3">+ Start a consultation</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2>Add Symptomps or any other details</h2>
                            <Textarea placeholder="Add details here..." className="h-[200px] mt-1"
                                onChange={(e)=>{setNote(e.target.value)}}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose><Button variant={'outline'}>Cancel</Button></DialogClose>
                    <Button 
                        disabled={note.length === 0} 
                        onClick={async()=>{
                            const response = await axios.post('/api/get-doctor-sugesstion', {note})
                            console.log(response.data)
                        }}
                        >
                        Next <ArrowRight/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddNewSessionDialog