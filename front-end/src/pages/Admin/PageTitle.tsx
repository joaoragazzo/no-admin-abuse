import { FaAngleRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface PageTitleProps {
    main: string
    emphasis?: string
    backlink?: boolean
}

export const PageTitle: React.FC<PageTitleProps> = ({emphasis, main, backlink}) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="font-extrabold text-2xl mb-5">
                {main} {emphasis && <span className="text-blue-500">{emphasis}</span>}
            </h1>
            {backlink && 
                <div 
                    className="flex flex-row items-center gap-2 cursor-pointer"
                    onClick={() => {navigate(-1)}}
                >
                    Voltar <FaAngleRight />
                </div>
            }
            
        </div>
        
    )
}