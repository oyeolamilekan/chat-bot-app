import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type SuspencePropType = {
    children: ReactNode,
    fallBackEmpty?: ReactNode,
    isLoading: boolean,
    isEmpty?: boolean | null,
    isError: boolean,
}

export default function CustomSupense({
    children,
    fallBackEmpty,
    isLoading,
    isEmpty,
    isError
}: SuspencePropType) {
    if (isError)
        return <div className="text-center p-5">Something bad happended, kindly reach out to support.</div>
    else if (isLoading)
        return <div className="text-center p-5 w-full">
            <Loader2 className='h-10 w-10 text-blue-500 animate animate-spin' />
        </div>
    else if (isEmpty)
        return <>{fallBackEmpty}</>
    else
        return <>{children}</>
}