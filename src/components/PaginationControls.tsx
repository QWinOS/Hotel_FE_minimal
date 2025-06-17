"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

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
  const page = searchParams.get("page") ?? "1";

  const goToPreviousPage = () => {
    const prevPage = Math.max(1, currentPage - 1);
    router.replace(`/gallery/${prevPage}`); // Updates URL without adding history
  };

  const goToNextPage = () => {
    const nextPage = Math.min(totalPage, currentPage + 1);
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
        <AiOutlineDoubleLeft />
      </button>
      <div className="text-xl">{page}</div>
      <button
        className="p-1 text-white disabled:opacity-0"
        onClick={goToNextPage}
        disabled={currentPage === totalPage}
        // disabled={!hasNextPage}
        // onClick={() => {
        //   router.push(`${pathname}?page=${Number(page) + 1}`);
        // }}
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

export default PaginationControls;
