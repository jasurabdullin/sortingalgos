import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateBubbleSortAnimationArray } from "@/algorithms/bubble-sort";
import { generateInsertionSortAnimationArray } from "@/algorithms/insertion-sort";
import { generateMergeSortAnimationArray } from "@/algorithms/merge-sort";
import { generateQuickSortAnimationArray } from "@/algorithms/quick-sort";
import { generateSelectionSortAnimationArray } from "@/algorithms/selection-sort";
import { SortingAlgorithmType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const MIN_ANIMATION_SPEED = 50;
export const MAX_ANIMATION_SPEED = 400;

export const algorithmOptions = [
  { label: "Bubble", value: "bubble" },
  { label: "Quick", value: "quick" },
  { label: "Merge", value: "merge" },
  { label: "Insertion", value: "insertion" },
  { label: "Selection", value: "selection" },
];

export function generateAnimationArray(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: [number[], boolean][]) => void
) {
  switch (selectedAlgorithm) {
    case "bubble":
      generateBubbleSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "quick":
      generateQuickSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "merge":
      generateMergeSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "insertion":
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "selection":
      generateSelectionSortAnimationArray(isSorting, array, runAnimation);
      break;
    default:
      break;
  }
}

export const sortingAlgorithmsData = {
  bubble: {
    title: "Bubble Sort",
    description:
      "A simple comparison-based sorting algorithm. Bubble sort repeatedly compares and swaps adjacent elements if they are in the wrong order, moving larger elements towards the end with each pass through the list. This process continues until the list is sorted and no more swaps are needed.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
    codes: [
      {
        language: "TypeScript",
        code: `function bubbleSort(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [[array[j], array[j + 1]]] = [[array[j + 1], array[j]]];
      }
    }
  }
}`,
      },
      {
        language: "Java",
        code: `void bubbleSort(int array[], int n){
    int i, j;
    bool swapped;
    for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array[j], array[j + 1]);
                swapped = true;
            }
        }

        if (swapped == false)
            break;
    }
  }`
      }
    ],
  },
  insertion: {
    title: "Insertion Sort",
    description:
      "Insertion sort builds the final sorted array one element at a time, by repeatedly taking the next unsorted element and inserting it into its correct position among the previously sorted elements. This process continues until all elements have been inserted into their proper place, resulting in a sorted list.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
    codes: [
      {
        language: "TypeScript",
        code: `function insertionSort(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    const currentValue = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currentValue) {
      array[j + 1] = array[j];
      j -= 1;
    }
    array[j + 1] = currentValue;
  }
}`
      },
    ],
  },
  selection: {
    title: "Selection Sort",
    description:
      "Selection sort works by repeatedly finding the minimum element from the unsorted portion of the list and swapping it with the element at the current position. This process is continued for each position in the list, moving the boundary of the sorted and unsorted portions one element forward each time until the entire list is sorted.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n²)",
    codes: [
      {
        language: "TypeScript",
        code: `function selectionSort(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
}`
      },
    ],
  },
  merge: {
    title: "Merge Sort",
    description:
      "Merge sort divides the unsorted list into n sublists, each containing one element (a list of one element is considered sorted), and then repeatedly merges these sublists to produce new sorted sublists until there is only one sublist remaining, which is the sorted list. This algorithm uses a divide-and-conquer approach, splitting the list in half recursively and merging the sorted halves back together.",
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    codes: [
      {
        language: "TypeScript",
        code: `function merge(
  array: number[],
  begin: number,
  middle: number,
  finish: number
) {
  const left = array.slice(begin, middle);
  const right = array.slice(middle, finish);

  let i = 0;
  let j = 0;
  let k = begin;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k] = left[i];
      i += 1;
    } else {
      array[k] = right[j];
      j += 1;
    }
    k++;
  }
  while (i < left.length) {
    array[k] = left[i];
    i += 1;
    k += 1;
  }
  while (j < right.length) {
    array[k] = right[j];
    j += 1;
    k += 1;
  }
}

function mergeSort(array: number[]) {
  const animations: AnimationArrayType = [];
  for (let k = 1; k < array.length; k = 2 * k) {
    for (let i = 0; i < array.length; i += 2 * k) {
      const begin = i;
      const middle = i + k;
      const finish = Math.min(i + 2 * k, array.length);
      merge(array, begin, middle, finish);
    }
  }
}`
      },
    ],
  },
  quick: {
    title: "Quick Sort",
    description:
      "Quick sort selects a 'pivot' element from the array and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively, and the sorted sub-arrays are combined with the pivot to form the sorted array.",
    worstCase: "O(n²)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    codes: [
      {
        language: "TypeScript",
        code: `function partition(
    array: number[],
    begin: number,
    finish: number,
  ) {
    let i = begin;
    let j = finish + 1;
    const condition = true;
    const pivot = array[begin];
    while (condition) {
      while (array[++i] <= pivot) {
        if (i === finish) break;
      }
      while (array[--j] >= pivot) {
        if (j === begin) break;
      }
      if (j <= i) break;
      [array[i], array[j]] = [array[j], array[i]];
    }
    [array[begin], array[j]] = [array[j], array[begin]];
    return j;
  }
  
  function quicksort(
    array: number[],
    begin: number,
    finish: number,
  ) {
    if (begin < finish) {
      const part = partition(array, begin, finish);
      quicksort(array, begin, part - 1);
      quicksort(array, part + 1, finish,);
    }
  }`

      },
    ],
  },
};
