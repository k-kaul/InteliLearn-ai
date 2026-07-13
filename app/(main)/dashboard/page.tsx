"use client"

import { useQuery } from "@tanstack/react-query"

export default function DashboardPage(){
    const {data, isLoading, error} = useQuery({
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
            <h1>Dashboard Page</h1>
            {
                data.map((community : {id:string; name:string; }) => (
                    <div key={community.id}> {community.name}</div>
                ))
            }
        </div>
    )
} 