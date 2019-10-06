/**
 * 最小堆算法
 */

interface NodeInfo {
  sortIndex: number;
}

function push(heap: NodeInfo[], node: NodeInfo) {
  const index = heap.length;
  heap.push(node);
  shiftUp(heap, node, index);
}

function pop(heap: NodeInfo[]) {
  const head = heap[0];
  if (head !== undefined) {
    const last = heap.pop();
    if (last !== head) {
      heap[0] = last;
      shiftDown(heap, last, 0);
    } else {
      return head;
    }
  } else {
    return null;
  }
}

function shiftUp(heap: NodeInfo[], node: NodeInfo, i: number) {
  let index = i;
  while (true) {
    const parentIndex = Math.floor((index - 1) / 2);
    const parent = heap[parentIndex];
    if (parent !== undefined && compare(parent, node) > 0) {
      // parent > node swap position
      heap[parentIndex] = node;
      heap[index] = parent;
      // index 重新赋值继续向上查找
      index = parentIndex;
    } else {
      return;
    }
  }
}

function shiftDown(heap: NodeInfo[], node: NodeInfo, i: number) {
  let index = i;
  const length = heap.length;
  while (index < length) {
    const leftIndex = (index + 1) * 2 - 1;
    const rightIndex = leftIndex + 1;
    const left = heap[leftIndex];
    const right = heap[rightIndex];

    if (left !== undefined && compare(left, node) < 0) {
      // 如果右边还要比左边的小
      if (right !== undefined && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // do nothing
      return;
    }
  }
}

function compare(sourceNode: NodeInfo, targetNode: NodeInfo) {
  const diff = sourceNode.sortIndex - targetNode.sortIndex;
  return diff;
}

export { push, pop };
