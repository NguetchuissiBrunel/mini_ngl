"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
    useEffect(() => {
        const test = async () => {
            const snap = await getDocs(collection(db, "messages"));
            console.log(snap.docs);
            console.log("fin");
        };
        test();
    }, []);

    return <h1>Test Firebase</h1>;
}
