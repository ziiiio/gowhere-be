// Credits: cgpt

export class PriorityQueue<T> {
  private readonly heap: { priority: number; tieBreaker: number; value: T }[];
  private tieBreakerCounter: number = 0;

  constructor() {
    this.heap = [];
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  private heapifyUp(index: number): void {
    if (index === 0) return;

    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex].priority > this.heap[index].priority ||
      (this.heap[parentIndex].priority === this.heap[index].priority &&
        this.heap[parentIndex].tieBreaker > this.heap[index].tieBreaker)
    ) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number): void {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let smallest = index;

    if (
      leftChildIndex < this.heap.length &&
      (this.heap[leftChildIndex].priority < this.heap[smallest].priority ||
        (this.heap[leftChildIndex].priority === this.heap[smallest].priority &&
          this.heap[leftChildIndex].tieBreaker <
            this.heap[smallest].tieBreaker))
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      (this.heap[rightChildIndex].priority < this.heap[smallest].priority ||
        (this.heap[rightChildIndex].priority === this.heap[smallest].priority &&
          this.heap[rightChildIndex].tieBreaker <
            this.heap[smallest].tieBreaker))
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(value: T, priority: number): void {
    const tieBreaker = this.tieBreakerCounter++;
    this.heap.push({ value, priority, tieBreaker });
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;

    if (this.heap.length === 1) return this.heap.pop()?.value;

    const minValue = this.heap[0].value;
    this.heap[0] = this.heap.pop() as {
      priority: number;
      tieBreaker: number;
      value: T;
    };
    this.heapifyDown(0);

    return minValue;
  }

  peekMin(): T | undefined {
    return this.heap.length > 0 ? this.heap[0].value : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
