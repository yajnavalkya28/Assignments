# Dynamic Programming Problems Explained

---

## 1. Fibonacci

**What:** Each number = sum of previous two numbers.

```
fib(n) = fib(n-1) + fib(n-2)
```

```
n   = 6
fib = 0 1 1 2 3 5
          ↑
      fib[4]=fib[3]+fib[2]
           = 2+1 = 3
```

**DP Array:** 1D — `dp[i] = dp[i-1] + dp[i-2]`

| | Complexity |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) → can be O(1) using two variables |

---

## 2. LCS (Longest Common Subsequence)

**What:** Longest sequence present in both strings (not necessarily contiguous).

```
s1 = "ABCBDAB"
s2 = "BDCABA"
LCS = "BCBA" → length 4
```

**Rule:**
```
if s1[i] == s2[j] → 1 + dp[i-1][j-1]   // both match, take both
else               → max(dp[i-1][j],     // skip from s1
                         dp[i][j-1])     // skip from s2
```

**DP Array:** 2D — rows = s1, cols = s2, fill left→right, top→bottom

| | Complexity |
|---|---|
| **Time** | O(n × m) |
| **Space** | O(n × m) → can be O(m) using two rows |

---

## 3. LPS (Longest Palindromic Subsequence)

**What:** Longest subsequence that reads same forwards and backwards.

```
s   = "babad"
LPS = "bab" → length 3
```

**Rule:**
```
if s[i] == s[j] → 2 + dp[i+1][j-1]     // both ends match
else             → max(dp[i+1][j],       // skip left
                       dp[i][j-1])       // skip right
```

**DP Array:** 2D — `dp[i][j]` = LPS of substring from i to j, fill bottom→top

| | Complexity |
|---|---|
| **Time** | O(n²) |
| **Space** | O(n²) → can be O(n) using two rows |

**Relation to LCS:**
```
LPS(s) = LCS(s, reverse(s))
s         = "babad"
reverse   = "dabab"
LCS       = "bab" = 3 ✅
```

---

## 4. LIS (Longest Increasing Subsequence)

**What:** Longest subsequence where every element is strictly greater than previous.

```
arr = [10, 9, 2, 5, 3, 7]
LIS = [2, 5, 7] or [2, 3, 7] → length 3
```

**Rule:**
```
if arr[k] > arr[i] → dp[k] = max(dp[k], dp[i]+1)
```

**DP Array:** 1D — `dp[i]` = length of LIS ending at index i

```
arr = [10,  9,  2,  5,  3,  7]
dp  = [ 1,  1,  1,  2,  2,  3]
                    ↑
             2 < 5, so dp[3] = dp[2]+1 = 2
```

| | Complexity |
|---|---|
| **Time** | O(n²) → can be O(n log n) using Binary Search |
| **Space** | O(n) |

---

## 5. Knapsack (0/1)

**What:** Given items with weight and value, maximize value within capacity W. Each item taken or not taken (0 or 1 time).

```
weights = [1, 2, 3]
values  = [6, 10, 12]
W       = 5
Best    = item2 + item3 → weight=5, value=22
```

**Rule:**
```
notTake = dp[i-1][w]                      // skip item
take    = value[i] + dp[i-1][w-weight[i]] // take item
dp[i][w] = max(take, notTake)
```

**DP Array:** 2D — rows = items, cols = capacity 0→W

```
      w=0  w=1  w=2  w=3  w=4  w=5
i=0  [ 0,   6,   6,   6,   6,   6 ]   // only item0
i=1  [ 0,   6,  10,  16,  16,  16 ]   // item0 or item1
i=2  [ 0,   6,  10,  16,  16,  22 ]   // all items ✅
```

| | Complexity |
|---|---|
| **Time** | O(n × W) |
| **Space** | O(n × W) → can be O(W) using single row |

---

## 6. Subset Sum

**What:** Can any subset of array elements add up to target?

```
arr    = [3, 34, 4, 12]
target = 7
Answer = true  → subset {3, 4} = 7
```

**Rule:**
```
notTake = dp[i-1][t]              // skip element
take    = dp[i-1][t - arr[i]]     // take element
dp[i][t] = take || notTake
```

**DP Array:** 2D boolean — rows = elements, cols = 0→target

```
        t=0   t=1  t=2  t=3  t=4  t=5  t=6  t=7
i=0(3) [ T,    F,   F,   T,   F,   F,   F,   F ]
i=1(34)[ T,    F,   F,   T,   F,   F,   F,   F ]
i=2(4) [ T,    F,   F,   T,   T,   F,   F,   T ] ✅
```

| | Complexity |
|---|---|
| **Time** | O(n × target) |
| **Space** | O(n × target) → can be O(target) using single row |

---

## Quick Comparison Table

| Problem | Time | Space | Optimized Space |
|---|---|---|---|
| Fibonacci | O(n) | O(n) | O(1) |
| LCS | O(n × m) | O(n × m) | O(m) |
| LPS | O(n²) | O(n²) | O(n) |
| LIS | O(n²) | O(n) | O(n log n) time |
| Knapsack | O(n × W) | O(n × W) | O(W) |
| Subset Sum | O(n × target) | O(n × target) | O(target) |
