"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

interface PaginationControlsProps {
  // hasNextPage: boolean;
  // hasPrevPage: boolean;
  currentPage: number;
  totalPage: number;
}
const PaginationControls: FC<PaginationControlsProps> = ({
  // hasNextPage,
  // hasPrevPage,
  currentPage,
  totalPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let page = searchParams.get("page") ?? "1";

  const goToPreviousPage = () => {
    const prevPage = Math.max(1, currentPage - 1);
    router.replace(`/gallery/${prevPage}`); // Updates URL without adding history
  };

  const goToNextPage = () => {
    const nextPage = Math.min(totalPage, currentPage + 1);
    page = nextPage.toString();
    router.replace(`/gallery/${nextPage}`);
  };

  return (
    <div className="flex justify-center gap-2">
      <button
        className="p-1 text-white disabled:opacity-0"
        // disabled={!hasPrevPage}
        // onClick={() => {
        //   // router.replace(page, Naviga);
        //   router.push(
        //     `${pathname}?page=${Number(page) > 1 ? Number(page) - 1 : 1}`
        //   );
        // }}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <GrCaretPrevious size={40} className="text-black cursor-pointer" />
      </button>
      <div className="text-2xl flex justify-center items-center">
        Page - {currentPage}
      </div>
      <button
        className="p-1 text-white disabled:opacity-0"
        onClick={goToNextPage}
        disabled={currentPage === totalPage}
        // disabled={!hasNextPage}
        // onClick={() => {
        //   router.push(`${pathname}?page=${Number(page) + 1}`);
        // }}
      >
        <GrCaretNext size={40} className="text-black cursor-pointer" />
      </button>
    </div>
  );
};

export default PaginationControls;
