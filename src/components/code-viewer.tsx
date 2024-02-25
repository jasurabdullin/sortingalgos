"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSortingAlgorithmContext } from "@/context/algorithm-context";
import { sortingAlgorithmsData } from "@/lib/utils";

import React, { Dispatch, SetStateAction } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeViewerProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ open, onOpenChange }) => {
  const { selectedAlgorithm } = useSortingAlgorithmContext();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="md:min-w-[800px] overflow-y-scroll">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {sortingAlgorithmsData[selectedAlgorithm].title}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-col space-y-4">

        {sortingAlgorithmsData[selectedAlgorithm].codes.map(
          ({ language, code }) => (
            <div key={language} className="flex-col space-y-2">
              <h3 className="font-semibold">{language}</h3>
              <CopyBlock
                text={code}
                language={language.toLowerCase()}
                showLineNumbers={false}
                theme={dracula}
              />
            </div>
          )
        )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CodeViewer;
