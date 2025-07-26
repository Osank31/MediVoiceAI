'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function HistoryList() {
    const [historyList, setHistoryList] = useState([]);
  return (
    <div className="mt-10 w-11/12">
        {historyList.length === 0 ? (
            <div className="flex items-center flex-col justify-center gap-5 p-7 border-4 border-dashed rounded-2xl ">
                <Image alt='empty' src={'/medical-assistance.png'}
                    width={200}
                    height={200}
                />
                <h2 className="font-bold text-xl mt-5">No Recent Consultations</h2>
                <p>It looks like you haven&apos;t consulted with any doctors yet.</p>
                <Button className="mt-3">+ Start a consultation</Button>
            </div>
        ):(
            <div></div>
        )}    
    </div>
  )
}
export default HistoryList