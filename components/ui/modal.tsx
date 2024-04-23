import { X } from 'lucide-react';
import { ReactElement } from 'react';

export function Modal({ onClose = () => { }, isShown, children, title }: PropTypes) {
    if (!isShown) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
            <div className="bg-white md:p-10 px-5 py-9 rounded md:max-w-[41rem] w-[90%] relative md:top-[-4rem] top-[-2rem] opacity-100 duration-500 transition-all" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title ?? ''}</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <X />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

interface PropTypes {
    onClose: () => void;
    children?: ReactElement;
    isShown?: boolean;
    title?: string;
}
