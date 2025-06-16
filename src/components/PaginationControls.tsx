"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page") ?? "1";

  return (
    <div className="flex justify-center gap-2">
      <button
        className="p-1 text-white disabled:opacity-0"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `${pathname}/?page=${Number(page) > 1 ? Number(page) - 1 : 1}`,
          );
        }}
      >
        <AiOutlineDoubleLeft />
      </button>
      <div className="text-xl">{page}</div>
      <button
        className="p-1 text-white disabled:opacity-0"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`${pathname}/?page=${Number(page) + 1}`);
        }}
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

export default PaginationControls;
