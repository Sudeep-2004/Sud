import { Book, ChevronDown, Code2, Binary, Database } from 'lucide-react';
import { useState } from 'react';
import { LearningModule } from '../types';

const modules: LearningModule[] = [
  {
    id: 'java-basics',
    title: 'Java Fundamentals',
    language: 'java',
    sections: [
      {
        id: 'variables',
        title: 'Variables and Data Types',
        content: `
Java supports several data types:

1. Primitive Types:
   - byte: 8-bit integer (-128 to 127)
   - short: 16-bit integer (-32,768 to 32,767)
   - int: 32-bit integer
   - long: 64-bit integer
   - float: 32-bit floating-point
   - double: 64-bit floating-point
   - boolean: true/false
   - char: 16-bit Unicode character

2. Reference Types:
   - String: Text data
   - Arrays
   - Classes
   - Interfaces

Example:
\`\`\`java
int number = 42;
String text = "Hello, World!";
double pi = 3.14159;
\`\`\`
        `
      },
      {
        id: 'control-flow',
        title: 'Control Flow Statements',
        content: `
Control flow in Java:

1. Conditional Statements:
   - if-else
   - switch-case

2. Loops:
   - for
   - while
   - do-while
   - for-each

Example:
\`\`\`java
// If-else statement
if (condition) {
    // code
} else {
    // alternative code
}

// For loop
for (int i = 0; i < 10; i++) {
    // repeated code
}
\`\`\`
        `
      },
      {
        id: 'oop',
        title: 'Object-Oriented Programming',
        content: `
Core OOP concepts in Java:

1. Classes and Objects
2. Inheritance
3. Polymorphism
4. Encapsulation
5. Abstraction

Example:
\`\`\`java
public class Animal {
    private String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}
\`\`\`
        `
      }
    ]
  },
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    language: 'python',
    sections: [
      {
        id: 'variables',
        title: 'Variables and Data Types',
        content: `
Python's basic data types:

1. Numbers:
   - int: Integer numbers
   - float: Decimal numbers
   - complex: Complex numbers

2. Sequences:
   - str: String (text)
   - list: Ordered collection
   - tuple: Immutable sequence

3. Mappings:
   - dict: Key-value pairs

4. Sets:
   - set: Unordered unique items
   - frozenset: Immutable set

Example:
\`\`\`python
# Number types
age = 25
height = 1.75
complex_num = 3 + 4j

# Sequences
name = "Python"
numbers = [1, 2, 3, 4, 5]
coordinates = (x, y, z)
\`\`\`
        `
      },
      {
        id: 'control-flow',
        title: 'Control Flow',
        content: `
Python control flow structures:

1. Conditional Statements:
   - if, elif, else
   - match-case (Python 3.10+)

2. Loops:
   - for loops
   - while loops
   - break and continue
   - list comprehensions

Example:
\`\`\`python
# If statement
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
else:
    grade = 'C'

# For loop
for i in range(5):
    print(i)
\`\`\`
        `
      },
      {
        id: 'functions',
        title: 'Functions and Modules',
        content: `
Functions in Python:

1. Function Definition:
   - def keyword
   - parameters and arguments
   - return values
   - lambda functions

2. Modules:
   - import statement
   - from ... import
   - creating modules

Example:
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Lambda function
square = lambda x: x**2

# Importing modules
import math
from datetime import datetime
\`\`\`
        `
      }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    language: 'general',
    sections: [
      {
        id: 'arrays',
        title: 'Arrays and Strings',
        content: `
Array Operations:

1. Basic Operations:
   - Insertion
   - Deletion
   - Traversal
   - Searching
   - Sorting

2. Common Problems:
   - Two Pointer Technique
   - Sliding Window
   - Array Manipulation

Example:
\`\`\`java
// Two Sum Problem
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}
\`\`\`
        `
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        content: `
Linked List Concepts:

1. Types:
   - Singly Linked List
   - Doubly Linked List
   - Circular Linked List

2. Operations:
   - Insertion (head, tail, middle)
   - Deletion
   - Traversal
   - Reversal

Example:
\`\`\`java
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) {
        this.val = val;
    }
}

// Reverse a linked list
public ListNode reverse(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
\`\`\`
        `
      },
      {
        id: 'trees',
        title: 'Trees and Graphs',
        content: `
Tree Data Structure:

1. Types:
   - Binary Tree
   - Binary Search Tree (BST)
   - AVL Tree
   - Red-Black Tree

2. Traversals:
   - Inorder
   - Preorder
   - Postorder
   - Level Order

Example:
\`\`\`java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) {
        this.val = val;
    }
}

// Inorder traversal
public void inorder(TreeNode root) {
    if (root != null) {
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }
}
\`\`\`
        `
      },
      {
        id: 'sorting',
        title: 'Sorting Algorithms',
        content: `
Common Sorting Algorithms:

1. Basic Sorts:
   - Bubble Sort (O(n²))
   - Selection Sort (O(n²))
   - Insertion Sort (O(n²))

2. Advanced Sorts:
   - Quick Sort (O(n log n))
   - Merge Sort (O(n log n))
   - Heap Sort (O(n log n))

Example:
\`\`\`java
// Quick Sort implementation
public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}
\`\`\`
        `
      }
    ]
  }
];

export default function LearningModules() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Book className="w-8 h-8 text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-800">Learning Modules</h2>
      </div>

      <div className="space-y-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <button
              className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 text-white transition-all hover:from-indigo-600 hover:to-purple-600"
              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
            >
              <div className="flex items-center gap-3">
                {module.language === 'java' && <Code2 className="w-5 h-5" />}
                {module.language === 'python' && <Binary className="w-5 h-5" />}
                {module.language === 'general' && <Database className="w-5 h-5" />}
                <span className="text-xl font-semibold">{module.title}</span>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ${
                  expandedModule === module.id ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {expandedModule === module.id && (
              <div className="p-6 space-y-4">
                {module.sections.map((section) => (
                  <div key={section.id} className="border-l-4 border-indigo-500 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                    <button
                      className="w-full text-left px-4 py-3"
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                            expandedSection === section.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                    
                    {expandedSection === section.id && section.content && (
                      <div className="px-4 pb-4">
                        <div className="bg-white rounded-lg p-4 prose prose-indigo max-w-none">
                          <pre className="whitespace-pre-wrap font-mono text-sm">
                            {section.content}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}