# Operating Systems Assignment 2 Solutions

## 1. Classic Process Synchronization Problems

### A. Producer-Consumer Problem

**Problem**: Producers add items to bounded buffer, consumers remove them. Buffer has fixed size.

**Challenges**: Race condition, buffer overflow/underflow, mutual exclusion needed

**Solution**:
```c
semaphore mutex = 1, empty = n, full = 0;

Producer() {
    wait(empty);
    wait(mutex);
    add_to_buffer(item);
    signal(mutex);
    signal(full);
}

Consumer() {
    wait(full);
    wait(mutex);
    item = remove_from_buffer();
    signal(mutex);
    signal(empty);
}
```

---

### B. Readers-Writers Problem

**Problem**: Multiple readers can read simultaneously, writers need exclusive access.

**Challenges**: Reader-writer coordination, potential starvation, mutual exclusion for writers

**Solution (Reader Priority)**:
```c
semaphore mutex = 1, wrt = 1;
int read_count = 0;

Reader() {
    wait(mutex);
    read_count++;
    if(read_count == 1) wait(wrt);
    signal(mutex);
    
    // READ DATA
    
    wait(mutex);
    read_count--;
    if(read_count == 0) signal(wrt);
    signal(mutex);
}

Writer() {
    wait(wrt);
    // WRITE DATA
    signal(wrt);
}
```

---

### C. Dining Philosophers Problem

**Problem**: 5 philosophers, 5 chopsticks. Each needs 2 chopsticks to eat. Avoid deadlock.

**Challenges**: Deadlock (all pick left chopstick), starvation, mutual exclusion

**Solution (Asymmetric)**:
```c
semaphore chopstick[5] = {1,1,1,1,1};

Philosopher(int i) {
    if(i % 2 == 0) {
        wait(chopstick[i]);
        wait(chopstick[(i+1)%5]);
    } else {
        wait(chopstick[(i+1)%5]);
        wait(chopstick[i]);
    }
    
    // EAT
    
    signal(chopstick[i]);
    signal(chopstick[(i+1)%5]);
}
```

---

## 2. Banker's Algorithm

**Given**:
- Allocation: P0[0,0,1,2], P1[1,0,0,0], P2[1,3,5,4], P3[0,6,3,2], P4[0,0,1,4]
- Max: P0[0,0,1,2], P1[1,7,5,0], P2[2,3,5,6], P3[0,6,5,2], P4[0,6,5,6]
- Available: [1,5,2,0]

### Need Matrix (Max - Allocation)
```
     A  B  C  D
P0 [ 0  0  0  0 ]
P1 [ 0  7  5  0 ]
P2 [ 1  0  0  2 ]
P3 [ 0  0  2  0 ]
P4 [ 0  6  4  2 ]
```

### Finding Safe Sequence

| Step | Process | Need | Available | Work After |
|------|---------|------|-----------|------------|
| 1 | P0 | [0,0,0,0] | [1,5,2,0] | [1,5,3,2] |
| 2 | P2 | [1,0,0,2] | [1,5,3,2] | [2,8,8,6] |
| 3 | P1 | [0,7,5,0] | [2,8,8,6] | [3,8,8,6] |
| 4 | P3 | [0,0,2,0] | [3,8,8,6] | [3,14,11,8] |
| 5 | P4 | [0,6,4,2] | [3,14,11,8] | [3,14,12,12] |

**Safe Sequence**: **P0 → P2 → P1 → P3 → P4** ✓

---

## 3. Contiguous Memory Allocation Algorithms

### A. First Fit
**Principle**: Allocate first block large enough

**Example**: Blocks[100K,500K,200K,300K,600K], Process 212K → Block 500K

**Pros**: Fast, simple | **Cons**: External fragmentation

---

### B. Best Fit
**Principle**: Allocate smallest sufficient block

**Example**: Process 212K → Block 300K (smallest fit)

**Pros**: Better utilization | **Cons**: Slow, creates tiny holes

---

### C. Worst Fit
**Principle**: Allocate largest available block

**Example**: Process 212K → Block 600K (largest)

**Pros**: Leaves larger holes | **Cons**: Slowest, poor utilization

---

### Comparison

| Algorithm | Speed | Fragmentation | Utilization |
|-----------|-------|---------------|-------------|
| First Fit | Fast | Moderate | Moderate |
| Best Fit | Slow | High | Good |
| Worst Fit | Slow | Low | Poor |

---

## 4. Non-Contiguous Memory Allocation

### A. Paging

**Concept**: Divide memory into fixed-size frames, processes into pages

**Address Translation**:
```
Logical Address = <Page#, Offset>
Physical Address = <Frame#, Offset>

Page# → Page Table → Frame#
```

**Example**:
- Page size: 4KB (2^12)
- Logical: 0x1234 → Page 1, Offset 0x234
- Page Table[1] = Frame 6
- Physical: 0x6234

**Pros**: No external fragmentation, easy allocation  
**Cons**: Internal fragmentation, page table overhead

---

### B. Paging Hardware

**Components**:
- **PTBR**: Points to page table
- **PTLR**: Page table size
- **TLB**: Fast cache for page entries

**TLB Performance**:
```
Hit ratio = 80%, TLB time = 20ns, Memory time = 100ns

EAT = 0.8(20+100) + 0.2(20+100+100) = 140ns
```

**Multi-level Paging**: Reduces page table size using outer/inner tables

---

### C. Segmentation

**Concept**: Divide program into logical segments (code, data, stack)

**Segment Table**: Base (start address) + Limit (length)

**Address Translation**:
```
Logical: <Segment#, Offset>
Check: Offset < Limit
Physical = Base[Segment] + Offset
```

**Example**:
- Seg 1: Base=6300, Limit=400
- Logical (1,53) → Physical = 6300+53 = 6353
- Logical (1,500) → Error (500>400)

**Pros**: Logical organization, easy protection  
**Cons**: External fragmentation, complex management

---

### Paging vs Segmentation

| Feature | Paging | Segmentation |
|---------|--------|--------------|
| Size | Fixed | Variable |
| User View | Hidden | Visible |
| Fragmentation | Internal | External |
| Protection | Page-level | Segment-level |

---

## END ✓