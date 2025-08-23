import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

interface PaginationProps {
    currentPage: number,
    totalPages: number | undefined,
    onPageChange: (page: number) => void,
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const generatePagination = (current: number, total: number): (number | string)[] => {
        const range: (number | string)[] = [];
        const visiblePages = Math.floor(window.innerWidth / 200);
        const totalNumbers = visiblePages;
        const totalBlocks = totalNumbers + 2;
    
        if (total <= totalBlocks) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
    
        const start = Math.max(2, current - Math.floor(visiblePages / 2));
    
        const adjustedStart = Math.max(2, Math.min(start, total - visiblePages));
    
        range.push(1);
    
        if (adjustedStart > 2) {
            range.push("...");
        }
    
        for (let i = adjustedStart; i < adjustedStart + visiblePages && i < total; i++) {
            range.push(i);
        }
    
        if (adjustedStart + visiblePages < total) {
            range.push("...");
        }
    
        range.push(total);
    
        return range;
    };

    if (!totalPages) return <></>

    const pages = generatePagination(currentPage, totalPages);

    return (
        <div className="flex items-center justify-center text-sm gap-3">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <FaAngleLeft /> Anterior
          </div>
    
          <div className="hidden gap-2 bg-gray-900 px-6 rounded-full sm:flex">
            {pages.map((p, idx) => (
              <div
                key={idx}
                className={`
                  w-8 aspect-square flex items-center justify-center 
                  rounded-md font-extrabold text-xs
                  ${p === currentPage ? "bg-blue-900" : typeof(p) === "number" && "hover:bg-blue-950 cursor-pointer"}
                `}
                onClick={() => typeof p === "number" && onPageChange(p)}
              >
                {p}
              </div>
            ))}
          </div>
    
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            Próximo <FaAngleRight />
          </div>
        </div>
      );
}