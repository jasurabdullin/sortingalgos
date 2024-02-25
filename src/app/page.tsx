"use client";

import CodeViewer from "@/components/code-viewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSortingAlgorithmContext } from "@/context/algorithm-context";
import { SortingAlgorithmType } from "@/lib/types";
import {
  MAX_ANIMATION_SPEED,
  MIN_ANIMATION_SPEED,
  algorithmOptions,
  generateAnimationArray,
  sortingAlgorithmsData,
} from "@/lib/utils";
import { ArrowTopRightIcon, PlayIcon, ResetIcon } from "@radix-ui/react-icons";

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation,
    open,
    setOpen,
  } = useSortingAlgorithmContext();

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }

    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  const handleSpeedChange = (value: number[]) => {
    setAnimationSpeed(value[0]);
  };

  const handleAlgorithmSelection = (algorithm: SortingAlgorithmType) => {
    setSelectedAlgorithm(algorithm);
    resetArrayAndAnimation();
  };

  return (
    <main className="h-screen w-screen">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4 space-y-4"
        >
          <div className="h-[80px] flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-semibold hidden md:flex">
                Sorting Algorithms
              </h1>
              <div className="flex space-x-4">
                <span className="text-muted-foreground text-xs flex">
                  Built by
                  <a
                    className="text-xs flex text-purple-400 ml-1"
                    href="https://www.linkedin.com/in/jasurabdullin/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jasur Abdullin
                  </a>
                </span>
                <a
                  className="text-xs flex text-purple-400"
                  href="https://github.com/jasurabdullin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code <ArrowTopRightIcon className="ml-[1px] w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Slider
                disabled={isSorting}
                defaultValue={[animationSpeed]}
                max={MAX_ANIMATION_SPEED}
                min={MIN_ANIMATION_SPEED}
                onValueChange={handleSpeedChange}
                className="w-[150px]"
              />

              <Button onClick={handlePlay} size="sm">
                {requiresReset ? (
                  <div className="flex">
                    <ResetIcon className="mr-2 h-4 w-4" /> Reset
                  </div>
                ) : (
                  <div className="flex">
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Run
                  </div>
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <Tabs defaultValue="bubble" className="w-[400px]">
              <TabsList>
                {algorithmOptions.map(({ value, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    onClick={() =>
                      handleAlgorithmSelection(value as SortingAlgorithmType)
                    }
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
              View Code
            </Button>
          </div>

          <div className="grid md:grid-cols-6 gap-4">
            <Card className="shadow-none rounded-md col-span-4">
              <CardHeader>
                <CardTitle>
                  {sortingAlgorithmsData[selectedAlgorithm].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                {sortingAlgorithmsData[selectedAlgorithm].description}
              </CardContent>
            </Card>
            <Card className="shadow-none rounded-md col-span-2">
              <CardHeader>
                <CardTitle>Time Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="flex w-full text-sm text-gray-500">
                    <span className="w-28">Worst Case:</span>
                    <span>
                      {sortingAlgorithmsData[selectedAlgorithm].worstCase}
                    </span>
                  </p>
                  <p className="flex w-full text-sm text-gray-500">
                    <span className="w-28">Average Case:</span>
                    <span>
                      {sortingAlgorithmsData[selectedAlgorithm].averageCase}
                    </span>
                  </p>
                  <p className="flex w-full text-sm text-gray-500">
                    <span className="w-28">Best Case:</span>
                    <span>
                      {sortingAlgorithmsData[selectedAlgorithm].bestCase}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full pt-10">
            <div className="w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CodeViewer open={open} onOpenChange={() => setOpen(false)} />
    </main>
  );
}
