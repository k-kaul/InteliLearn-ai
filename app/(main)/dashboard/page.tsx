"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

export default function DashboardPage(){
    const { user } = useUser();
    
    const {data, isLoading, error}= useQuery({
        queryKey: ["communities"],
        queryFn: async() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([{
                        id:1, name: "community 1"
                    }])
                }, 1000);
            })
        }
    })
    
    return (
        <div className="page-wrapper">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Page</h1>
                <p className="text-muted-foreground">Welcome Back, {user?.firstName || "User"}</p>
            </div>
        </div>
    )
} 