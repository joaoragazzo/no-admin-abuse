interface PageTitleProps {
    main: string
    emphasis?: string
}

export const PageTitle: React.FC<PageTitleProps> = ({emphasis, main}) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="font-extrabold text-2xl mb-5">
                {main} {emphasis && <span className="text-blue-500">{emphasis}</span>}
            </h1>
        </div>
        
    )
}