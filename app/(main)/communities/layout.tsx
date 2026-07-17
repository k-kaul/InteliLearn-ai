import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommunitiesLayout({ children }: {children:React.ReactNode}){
    return (
        <div className="page-wrapper">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Communities Page</h1>
                    <p className="text-muted-foreground">Manage you learning goals and find learning partners.</p>
                </div>
                <Link href={"/communities/all"}>
                    <Button variant={"outline"}>+ Join More Communities</Button>
                </Link>
            </div>
            {children}
        </div>
    )
}