// Credits: cgpt
import { PriorityQueue } from './priority-queue';

describe('PriorityQueue', () => {
  it('should insert and extract values in priority order', () => {
    const priorityQueue = new PriorityQueue<string>();

    priorityQueue.insert('Task 1', 3);
    priorityQueue.insert('Task 2', 1);
    priorityQueue.insert('Task 3', 6);
    priorityQueue.insert('Task 4', 5);
    priorityQueue.insert('Task 5', 2);

    expect(priorityQueue.extractMin()).toBe('Task 2'); // Priority 1
    expect(priorityQueue.extractMin()).toBe('Task 5'); // Priority 2
    expect(priorityQueue.extractMin()).toBe('Task 1'); // Priority 3
    expect(priorityQueue.extractMin()).toBe('Task 4'); // Priority 5
    expect(priorityQueue.extractMin()).toBe('Task 3'); // Priority 6
    expect(priorityQueue.extractMin()).toBeUndefined();
  });

  it('should return undefined when trying to extract from an empty queue', () => {
    const priorityQueue = new PriorityQueue<string>();
    expect(priorityQueue.extractMin()).toBeUndefined();
  });

  it('should return undefined when trying to peek at an empty queue', () => {
    const priorityQueue = new PriorityQueue<string>();
    expect(priorityQueue.peekMin()).toBeUndefined();
  });

  it('should correctly report the size and emptiness of the queue', () => {
    const priorityQueue = new PriorityQueue<string>();

    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);

    priorityQueue.insert('Task 1', 3);
    priorityQueue.insert('Task 2', 1);
    priorityQueue.insert('Task 3', 6);

    expect(priorityQueue.size()).toBe(3);
    expect(priorityQueue.isEmpty()).toBe(false);

    priorityQueue.extractMin();
    priorityQueue.extractMin();
    priorityQueue.extractMin();

    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
  });

  it('should handle values with the same priority correctly', () => {
    const priorityQueue = new PriorityQueue<string>();

    priorityQueue.insert('Task 1', 2);
    priorityQueue.insert('Task 2', 1);
    priorityQueue.insert('Task 3', 1);
    priorityQueue.insert('Task 4', 2);

    expect(priorityQueue.extractMin()).toBe('Task 2'); // Priority 1, inserted first
    expect(priorityQueue.extractMin()).toBe('Task 3'); // Priority 1, inserted second
    expect(priorityQueue.extractMin()).toBe('Task 1'); // Priority 2, inserted first
    expect(priorityQueue.extractMin()).toBe('Task 4'); // Priority 2, inserted second
    expect(priorityQueue.extractMin()).toBeUndefined();
  });
});
