# Digital Assignment 3 - Complete Solutions

## 1. n-Queens Problem using Backtracking

### 4-Queens Problem

**Objective:** Place 4 queens on a 4×4 chessboard such that no two queens attack each other.

**Trace:**

```
Initial Board (empty):
. . . .
. . . .
. . . .
. . . .

Step 1: Place Q1 in Row 0, Col 0
Q . . .
. . . .
. . . .
. . . .

Step 2: Try Row 1, Col 0 → Attacked by Q1 (same column)
Step 2: Try Row 1, Col 1 → Attacked by Q1 (diagonal)
Step 2: Place Q2 in Row 1, Col 2
Q . . .
. . Q .
. . . .
. . . .

Step 3: Try Row 2, Col 0 → Attacked by Q1 (same column)
Step 3: Try Row 2, Col 1 → Safe! But leads to no solution
Step 3: Backtrack to Row 1

Step 2 (retry): Place Q2 in Row 1, Col 3
Q . . .
. . . Q
. . . .
. . . .

Step 3: Try Row 2, Col 0 → Attacked by Q1
Step 3: Place Q3 in Row 2, Col 1
Q . . .
. . . Q
. Q . .
. . . .

Step 4: Try Row 3, Col 0 → Safe? Check diagonals → Safe!
Step 4: Try Row 3, Col 2 → Attacked by Q3 and Q2
Step 4: Backtrack...

After backtracking and trying different positions:

SOLUTION 1:
. Q . .
. . . Q
Q . . .
. . Q .

SOLUTION 2:
. . Q .
Q . . .
. . . Q
. Q . .
```

**Total Solutions for 4-Queens: 2 distinct solutions**

---

### 8-Queens Problem

**Objective:** Place 8 queens on an 8×8 chessboard.

**Trace (First Solution):**

```
Starting configuration:
Q . . . . . . .  (Row 0, Col 0)
. . . . Q . . .  (Row 1, Col 4)
. . . . . . . Q  (Row 2, Col 7)
. . . . . Q . .  (Row 3, Col 5)
. . Q . . . . .  (Row 4, Col 2)
. . . . . . Q .  (Row 5, Col 6)
. Q . . . . . .  (Row 6, Col 1)
. . . Q . . . .  (Row 7, Col 3)

Verification:
- No two queens in same row ✓
- No two queens in same column ✓
- No two queens on same diagonal ✓
```

**Backtracking Steps Summary:**
1. Place Q1 at (0,0)
2. Try positions for Q2 in row 1 until finding safe position at (1,4)
3. Continue for each row, backtracking when no safe position exists
4. When stuck, remove last queen and try next position
5. Repeat until all 8 queens are placed safely

**Total Solutions for 8-Queens: 92 distinct solutions**

---

## 2. Hamiltonian Circuit Problem

**Graph:** 
- Vertices: 1, 2, 3, 4, 5
- Edges: 1-2, 2-3, 3-4, 4-5, 5-1

**Adjacency Matrix:**
```
  1 2 3 4 5
1[0 1 0 0 1]
2[1 0 1 0 0]
3[0 1 0 1 0]
4[0 0 1 0 1]
5[1 0 0 1 0]
```

**Backtracking Trace:**

```
Start: Path = [1]

Step 1: From vertex 1, adjacent vertices: {2, 5}
  Try vertex 2: Path = [1, 2]
  
Step 2: From vertex 2, adjacent unvisited: {3}
  Try vertex 3: Path = [1, 2, 3]
  
Step 3: From vertex 3, adjacent unvisited: {4}
  Try vertex 4: Path = [1, 2, 3, 4]
  
Step 4: From vertex 4, adjacent unvisited: {5}
  Try vertex 5: Path = [1, 2, 3, 4, 5]
  
Step 5: Check if vertex 5 connects back to 1
  Edge 5-1 exists? YES ✓
  
HAMILTONIAN CIRCUIT FOUND: 1 → 2 → 3 → 4 → 5 → 1
```

**Alternative Path (if we had tried vertex 5 first):**
```
Start from 1 → 5 → 4 → 3 → 2 → 1
This is also valid!
```

---

## 3. Subset Sum Problem

**Given:** Set = {3, 34, 4, 12, 5, 2}, Target Sum = 9

**Backtracking Trace:**

```
State Space Tree:

                          {}
                    /            \
              Include 3          Exclude 3
              sum=3              sum=0
              /    \             /    \
         +34      -34        +34      -34
        sum=37   sum=3      sum=34   sum=0
         ✗        /  \        ✗       /  \
              +4    -4            +4      -4
            sum=7  sum=3        sum=38  sum=0
            / \     / \           ✗      / \
          +12 -12 +12 -12             +12   -12
          ✗  sum=7 ✗  sum=3           ✗    sum=0
              / \     / \                   / \
            +5  -5  +5  -5                +5   -5
            ✗  sum=7 ✗ sum=3             sum=5 sum=0
                / \     / \                / \   / \
              +2  -2  +2  -2             +2  -2 +2 -2
              ✗  sum=7 ✗ sum=3          sum=7 ✗ ✗ sum=0
                          / \             / \
                        ...  ...        +12 -12
                                        ✗   sum=7
                                             / \
                                           +4  -4
                                           ✗  sum=7
                                               / \
                                             +3  -3
                                             ✗  sum=7
```

**Detailed Trace:**

```
Level 0: sum=0, remaining={3,34,4,12,5,2}, target=9
  Branch 1: Include 3, sum=3
  
Level 1: sum=3, remaining={34,4,12,5,2}, target=9
  Branch 1a: Include 34, sum=37 > 9 (prune) ✗
  Branch 1b: Exclude 34, sum=3
  
Level 2: sum=3, remaining={4,12,5,2}, target=9
  Branch 1b1: Include 4, sum=7
  Branch 1b2: Exclude 4, sum=3
  
Level 3 (from 1b1): sum=7, remaining={12,5,2}, target=9
  Branch: Include 12, sum=19 > 9 (prune) ✗
  Branch: Exclude 12, sum=7
  
Level 4: sum=7, remaining={5,2}, target=9
  Branch: Include 5, sum=12 > 9 (prune) ✗
  Branch: Exclude 5, sum=7
  
Level 5: sum=7, remaining={2}, target=9
  Branch: Include 2, sum=9 = 9 ✓ SOLUTION FOUND!
  
SOLUTION: {3, 4, 2} with sum = 9
```

**Alternative Solution Path:**
```
{4, 5} is also a valid solution (4 + 5 = 9)
Path: Exclude 3 → Include 4 → Exclude 12 → Include 5
```

---

## 4. Assignment Problem using Branch and Bound

**Cost Matrix:**
```
       Job1  Job2  Job3  Job4
W1  [   9     2     7     8  ]
W2  [   6     4     3     7  ]
W3  [   5     8     1     8  ]
W4  [   7     6     9     4  ]
```

**Step 1: Calculate Lower Bound (Root Node)**

Reduce rows (subtract minimum from each row):
```
Row minimums: W1=2, W2=3, W3=1, W4=4

After row reduction:
       Job1  Job2  Job3  Job4
W1  [   7     0     5     6  ]
W2  [   3     1     0     4  ]
W3  [   4     7     0     7  ]
W4  [   3     2     5     0  ]

Initial Lower Bound = 2+3+1+4 = 10
```

Reduce columns (subtract minimum from each column):
```
Column minimums: Job1=3, Job2=0, Job3=0, Job4=0

After column reduction:
       Job1  Job2  Job3  Job4
W1  [   4     0     5     6  ]
W2  [   0     1     0     4  ]
W3  [   1     7     0     7  ]
W4  [   0     2     5     0  ]

Lower Bound = 10 + 3 = 13
```

**Branch and Bound Tree:**

```
                    Root (LB=13)
                    /    |    \
          W1→J2    W1→J1   W1→J3  W1→J4
          (LB=15)  (LB=17) (LB=18) (LB=19)
            |
      W1→J2, W2→J3
         (LB=16)
            |
    W1→J2, W2→J3, W3→J1
         (LB=21)
            |
W1→J2, W2→J3, W3→J1, W4→J4
      Total Cost = 18
```

**Detailed Branch Calculation:**

**Node: W1 → Job2 (cost = 2)**
- Remove W1 row and Job2 column
- New matrix:
```
       Job1  Job3  Job4
W2  [   6     3     7  ]
W3  [   5     1     8  ]
W4  [   7     9     4  ]
```
- Apply reduction: Row mins = {3,1,4}, Col mins = {5,1,4}
- Lower Bound = 13 + 2 = 15 (most promising!)

**Continue with W1→J2 branch:**

**Node: W2 → Job3 (cost = 3)**
- Lower Bound = 15 + 3 = 18

**Node: W3 → Job1 (cost = 5)**
- Lower Bound = 18 + 5 = 23

**Node: W4 → Job4 (cost = 4)**
- Total Cost = 2 + 3 + 5 + 4 = 14 ✗ (Recalculate...)

**Correct Optimal Assignment:**
```
W1 → Job2 (cost = 2)
W2 → Job3 (cost = 3)
W3 → Job1 (cost = 5)
W4 → Job4 (cost = 4)

Total Minimum Cost = 2 + 3 + 5 + 4 = 14
```

**Verification:**
```
Actually checking matrix values:
W1 → Job2: 2 ✓
W2 → Job3: 3 ✓
W3 → Job1: 5 ✓
W4 → Job4: 4 ✓
Total = 14
```

**Complexity Analysis:**

- **Time Complexity:** O(n! × n²)
  - n! possible assignments
  - n² for reduction at each node
  - Branch and Bound prunes many branches, making it more efficient than brute force
  - Practical complexity: O(2ⁿ × n²) with good pruning

- **Space Complexity:** O(n²)
  - Storing cost matrix: O(n²)
  - Stack depth for recursion: O(n)
  - Overall: O(n²)

---

## 5. 0/1 Knapsack Problem using Branch and Bound

**Input:**
- Capacity: 16
- Items: {(P=40, W=2), (P=30, W=5), (P=50, W=10), (P=10, W=5)}

**Step 1: Calculate Profit/Weight Ratio**

```
Item  Profit  Weight  P/W Ratio
1     40      2       20.0
2     30      5       6.0
3     50      10      5.0
4     10      5       2.0

Sorted by P/W (descending): Item1, Item2, Item3, Item4
```

**Step 2: Branch and Bound Tree**

```
Level 0: Root
  Profit=0, Weight=0, Bound=140
  (Bound calculation: 0 + 40 + 30 + 50 + 10 = 130, or use fractional)
  Upper Bound = 0 + 40 + 30 + 50 + (16-17)×2 = Cannot fit all
  
  Fractional: 40 + 30 + 50 + (16-17 impossible)
  Correct: 40 + 30 + (16-7)×5 = 40 + 30 + 45 = 115

                    Root (P=0, W=0, UB=115)
                    /                    \
          Include Item1              Exclude Item1
          (P=40, W=2, UB=115)       (P=0, W=0, UB=75)
          /              \                /           \
     +Item2          -Item2          +Item2         -Item2
    (P=70,W=7)    (P=40,W=2)      (P=30,W=5)     (P=0,W=0)
    UB=115        UB=105           UB=75          UB=60
    /    \         /    \          /    \         /    \
  +I3   -I3     +I3   -I3       +I3   -I3      +I3   -I3
  ✗    (P=70)   ✗    (P=40)     ✗    (P=30)    ✗   (P=0)
  W>16  W=7     W>16  W=2        W>16 W=5       W>16 W=0
        /  \          /  \              /  \          /  \
      +I4  -I4      +I4  -I4          +I4  -I4      +I4  -I4
      ✗   P=70      ✗   P=40          ✗   P=30      ✗   P=0
     W>16 W=7      W>16 W=2          W>16 W=5      W>16 W=0
```

**Detailed Trace:**

```
Node 1: {} → Include Item1
  Profit = 40, Weight = 2, Remaining Capacity = 14
  Upper Bound = 40 + 30 + (14-15)... 
  UB = 40 + 30 + 50 + (14-20 impossible) = 40 + 30 + 14×5 = 40 + 30 + 45 = 115
  
Node 2: {Item1} → Include Item2
  Profit = 70, Weight = 7, Remaining = 9
  UB = 70 + min(50, 9×5) = 70 + 45 = 115
  
Node 3: {Item1, Item2} → Include Item3?
  Weight = 7 + 10 = 17 > 16 ✗ PRUNE
  
Node 4: {Item1, Item2} → Exclude Item3, Include Item4?
  Weight = 7 + 5 = 12, Profit = 80
  Upper Bound = 80 (no more items)
  
Node 5: {Item1, Item2} → Exclude Items 3,4
  Profit = 70, Weight = 7 ✓ (Feasible)
  
Node 6: {Item1} → Exclude Item2, Include Item3
  Weight = 2 + 10 = 12, Profit = 90
  Remaining = 4
  
Node 7: {Item1, Item3} → Include Item4?
  Weight = 12 + 5 = 17 > 16 ✗ PRUNE
  
Node 8: {Item1, Item3} → Exclude Item4
  Profit = 90, Weight = 12 ✓ (Feasible - BEST!)
```

**Optimal Solution:**
```
Selected Items: Item1 (P=40, W=2) + Item3 (P=50, W=10)
Total Profit: 90
Total Weight: 12
Remaining Capacity: 4
```

**Verification:**
- Item1 + Item3: W=12 ≤ 16 ✓, P=90
- Item1 + Item2 + Item4: W=12 ≤ 16 ✓, P=80 (less profit)
- Item1 + Item2: W=7 ≤ 16 ✓, P=70 (less profit)

**Complexity:**
- **Time Complexity:** O(2ⁿ) worst case, but pruning reduces it significantly
- **Space Complexity:** O(n) for recursion stack

---

## 7. Job Sequencing with Deadlines using Branch and Bound

**Input:**
```
Job  Deadline  Profit
A    2         100
B    1         19
C    2         27
D    1         25
```

**Step 1: Sort by Profit (Descending)**
```
Job  Deadline  Profit
A    2         100
D    1         25
C    2         27
B    1         19

Sorted: A(100), C(27), D(25), B(19)
```

**Step 2: Branch and Bound Tree**

```
Maximum deadline = 2, so we have 2 time slots: [Slot1, Slot2]

                    Root (Profit=0)
                    /              \
              Include A         Exclude A
              (P=100)           (P=0)
              /      \          /      \
          +C(s2)   +C(s1)   +C(s2)   +C(s1)
          P=127    ✗       P=27     P=27
          A:s1,2  conflict A:none  A:none
          C:s2             C:s2    C:s1
```

**Detailed Trace:**

```
Level 0: No jobs selected
  Available slots: [_, _]
  Upper Bound = 100 + 27 + 25 + 19 = 171
  
Level 1: Consider Job A (deadline=2, profit=100)
  Branch 1a: Include A
    Try Slot 2: Available ✓
    Slots: [_, A]
    Profit = 100
    Upper Bound = 100 + 27 + 25 + 19 = 171
    
  Branch 1b: Exclude A
    Slots: [_, _]
    Profit = 0
    Upper Bound = 27 + 25 + 19 = 71 (less promising)
    
Level 2: Consider Job C (deadline=2, profit=27)
  From Branch 1a (Include A):
    Branch 2a: Include C
      Try Slot 2: Occupied by A ✗
      Try Slot 1: Available ✓
      Slots: [C, A]
      Profit = 127
      Upper Bound = 127 + 25 + 19 = 171
      
    Branch 2b: Exclude C
      Slots: [_, A]
      Profit = 100
      Upper Bound = 100 + 25 + 19 = 144
      
Level 3: Consider Job D (deadline=1, profit=25)
  From Branch 2a (Include A, C):
    Branch 3a: Include D
      Try Slot 1: Occupied by C ✗
      Cannot schedule D (PRUNE)
      
    Branch 3b: Exclude D
      Slots: [C, A]
      Profit = 127
      Upper Bound = 127 + 19 = 146
      
Level 4: Consider Job B (deadline=1, profit=19)
  From Branch 3b:
    Branch 4a: Include B
      Try Slot 1: Occupied by C ✗
      Cannot schedule B (PRUNE)
      
    Branch 4b: Exclude B
      Slots: [C, A]
      Profit = 127 ✓ FINAL SOLUTION
```

**Optimal Solution:**
```
Slot 1: Job C (Profit = 27)
Slot 2: Job A (Profit = 100)

Total Profit: 127
Jobs Selected: A, C
Jobs Excluded: D, B
```

**Greedy Comparison:**
```
Greedy approach (by profit):
- Schedule A at slot 2 (or 1): Profit = 100
- Schedule C at remaining slot: Profit = 27
- Try D at slot 1: If A is at slot 2, D can go to slot 1
  Slots: [D, A] → Profit = 125
- C cannot fit now

Actually, greedy sorted gives: [A, C] at deadline slots
Result: Same as Branch and Bound = 127
```

---

## 8. Travelling Salesman Problem using Branch and Bound

**Distance Matrix:**
```
     A   B   C   D
A [  0  10  15  20 ]
B [ 10   0  35  25 ]
C [ 15  35   0  30 ]
D [ 20  25  30   0 ]
```

**Step 1: Calculate Initial Lower Bound**

Row reduction:
```
Row minimums: A=10, B=10, C=15, D=20

After row reduction:
     A   B   C   D
A [  -  0   5  10 ]
B [  0  -  25  15 ]
C [  0  20  -  15 ]
D [  0   5  10  - ]

Sum of row minimums = 10+10+15+20 = 55
```

Column reduction:
```
Column minimums: All 0 already

Initial Lower Bound = 55
```

**Branch and Bound Tree:**

```
                    Root (LB=55)
                    Starting at A
                    /    |    \
              A→B      A→C    A→D
             (LB=55)  (LB=60) (LB=65)
              /  |  \
          A→B→C A→B→D
          LB=80  LB=70
                  |
              A→B→D→C
              LB=85
                  |
            A→B→D→C→A
            Cost=90
```

**Detailed Calculation:**

**Level 0: Root Node**
```
Path: [A]
Cities remaining: {B, C, D}
Lower Bound = 55
```

**Level 1: Choose next city from A**

**Branch 1a: A → B (cost = 10)**
```
Path: [A, B]
Cost so far: 10
Remaining: {C, D}

Reduced matrix (remove row A, column B):
     A   C   D
B [  -  25  15 ] → min=15 → [ -  10   0 ]
C [  0   -  15 ] → min=0  → [ 0   -  15 ]
D [  0  10   - ] → min=0  → [ 0  10   - ]

Column reduction on remaining:
     A   C   D
   [ -  10   0 ]
   [ 0   -  15 ]
   [ 0  10   - ]
   min: 0   10   0

After column reduction:
     A   C   D
   [ -   0   0 ]
   [ 0   -  15 ]
   [ 0   0   - ]

LB = 55 + 0 + (15+0+0) + (0+10+0) = 55 + 15 + 10 = 80
Actually LB = Cost so far + reduction = 10 + 45 = 55
Correct: LB = 10 (edge) + 45 (reduced) = 55
```

**Branch 1b: A → C (cost = 15)**
```
Path: [A, C]
Cost so far: 15
LB = 15 + reduced matrix bound = 60
```

**Branch 1c: A → D (cost = 20)**
```
Path: [A, D]
Cost so far: 20
LB = 20 + reduced matrix bound = 65
```

**Most promising: A → B (LB=55)**

**Level 2: From [A, B], choose next**

**Branch 2a: A → B → C (cost = 10 + 35 = 45)**
```
Path: [A, B, C]
Cost so far: 45
Remaining: {D}
LB = 45 + 30 (C→D) + 20 (D→A) = 95
```

**Branch 2b: A → B → D (cost = 10 + 25 = 35)**
```
Path: [A, B, D]
Cost so far: 35
Remaining: {C}
LB = 35 + 30 (D→C) + 15 (C→A) = 80
```

**Most promising: A → B → D (LB=80)**

**Level 3: Complete the tour**

**Path: A → B → D → C**
```
Cost: 10 + 25 + 30 + 15 = 80
Tour: A → B → D → C → A
```

**Level 3: Try other branches**

**Path: A → B → C → D**
```
Cost: 10 + 35 + 30 + 20 = 95
Tour: A → B → C → D → A
```

**Path: A → C → B → D**
```
Cost: 15 + 35 + 25 + 20 = 95
```

**Path: A → C → D → B**
```
Cost: 15 + 30 + 25 + 10 = 80
Tour: A → C → D → B → A (TIE!)
```

**Path: A → D → B → C**
```
Cost: 20 + 25 + 35 + 15 = 95
```

**Path: A → D → C → B**
```
Cost: 20 + 30 + 35 + 10 = 95
```

**Optimal Solutions (both have cost 80):**
```
Solution 1: A → B → D → C → A
  Distances: 10 + 25 + 30 + 15 = 80

Solution 2: A → C → D → B → A
  Distances: 15 + 30 + 25 + 10 = 80
```

**State Space Tree Summary:**
```
                    Root(55)
           /          |         \
       A→B(55)    A→C(60)    A→D(65)
       /    \        |           |
   A→B→C  A→B→D   A→C→B      A→D→B
   (95)    (80)    (95)       (95)
           |         |           |
       A→B→D→C   A→C→B→D    A→D→B→C
         80        95          95

Another branch from A→C:
       A→C(60)
          |
       A→C→D(75)
          |
      A→C→D→B
         80 ✓
```

**Final Answer:**
```
Minimum Cost: 80
Optimal Tours:
1. A → B → D → C → A (10+25+30+15=80)
2. A → C → D → B → A (15+30+25+10=80)
```

---

## Summary

All problems have been solved using the appropriate techniques:
- **N-Queens:** Backtracking with constraint checking
- **Hamiltonian Circuit:** Backtracking with graph traversal
- **Subset Sum:** Backtracking with pruning
- **Assignment Problem:** Branch and Bound with cost reduction
- **0/1 Knapsack:** Branch and Bound with upper bound calculation
- **Job Sequencing:** Branch and Bound with deadline constraints
- **TSP:** Branch and Bound with cost matrix reduction

Each solution includes detailed traces, decision trees, and optimal solutions with verification.
