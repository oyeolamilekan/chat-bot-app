import { FormEventHandler, ReactNode } from 'react'

export function Form({ onSubmit = () => { }, children }: PropTypes) {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}

interface PropTypes {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    children?: ReactNode;
}