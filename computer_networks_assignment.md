# Computer Networks Assignment Solutions
## CSE3003 - Fall Semester 2025-26

---

## Part-A (2 Marks Questions)

### 1. What is the information displayed by an "ipconfig"?

**ipconfig** displays:
- IP Address (IPv4/IPv6)
- Subnet Mask
- Default Gateway
- MAC Address (with /all)
- DHCP status
- DNS server addresses

### 2. Among packet switch and circuit switch, which is preferred for modern digital data communication?

**Packet switching** is preferred because:
- Better bandwidth utilization
- Supports bursty data traffic
- Cost-effective (shared resources)
- More fault-tolerant
- No idle time wastage

### 3. Suppose two computers are connected by an Ethernet hub at home. Is this a LAN, a MAN, or a WAN?

**LAN (Local Area Network)** - confined to small geographical area (home), uses Ethernet technology, provides high-speed local connectivity.

### 4. Describe the term "Jitter" in networks.

**Jitter** is the variation in packet arrival time or delay variance. It occurs due to different paths, network congestion, and variable queuing delays. Critical for real-time applications like VoIP and video streaming.

### 5. Distinguish the routing concepts of broadcasting and unicasting.

| Broadcasting | Unicasting |
|--------------|------------|
| One-to-all communication | One-to-one communication |
| Single packet to all hosts | Packet to specific destination |
| Uses broadcast address | Uses specific IP address |
| High network traffic | Efficient bandwidth use |
| Limited to local segment | Can traverse networks |

### 6. Identify the address class of the following IP addresses.

**(a) 200.58.20.165** - **Class C** (first octet 192-223)

**(b) 128.167.23.20** - **Class B** (first octet 128-191)

### 7. What is the need of IPv6 addressing?

IPv6 is needed due to:
- IPv4 address exhaustion (4.3 billion limit)
- Growing IoT and mobile devices
- 128-bit address space (340 undecillion addresses)
- Built-in security (IPSec)
- Simplified header and auto-configuration
- No NAT required

### 8. What would be preferable over other (TCP/UDP)?

**(a) Streaming live video: UDP** - Low latency, real-time delivery priority, packet loss acceptable

**(b) Large file transfers: TCP** - Reliability critical, ensures complete delivery, error correction

### 9. How is the multicasting operation done in email?

Email multicasting through:
- Distribution lists
- Mailing lists
- CC/BCC fields
- SMTP server replication
- Group email addresses that expand to multiple recipients

### 10. List out the types of DNS servers supported by the network.

1. Root DNS Servers
2. TLD (Top-Level Domain) Servers
3. Authoritative DNS Servers
4. Recursive DNS Servers (Resolvers)
5. Caching DNS Servers
6. Forwarding DNS Servers
7. Primary DNS Servers
8. Secondary DNS Servers

---

## Part-B (Detailed Questions)

### 11. Discuss in detail the ISO-OSI model and explain the functions of various layers.

**ISO-OSI Model** - 7-layer reference model for network communication:

**Layer 7: Application Layer**
- User interface and network services
- Protocols: HTTP, FTP, SMTP, DNS
- Functions: File transfer, email, web browsing

**Layer 6: Presentation Layer**
- Data format translation, encryption, compression
- Examples: JPEG, MPEG, SSL/TLS
- Ensures data readability

**Layer 5: Session Layer**
- Session management and synchronization
- Functions: Dialog control, checkpointing
- Protocols: NetBIOS, RPC

**Layer 4: Transport Layer**
- End-to-end communication
- Protocols: TCP (reliable), UDP (unreliable)
- Functions: Segmentation, flow control, error control
- Uses port numbers

**Layer 3: Network Layer**
- Logical addressing and routing
- Protocol: IP, ICMP, routing protocols
- Functions: Packet forwarding, path determination
- Device: Router

**Layer 2: Data Link Layer**
- Node-to-node transfer, error detection
- Sub-layers: LLC and MAC
- Protocols: Ethernet, PPP
- Device: Switch

**Layer 1: Physical Layer**
- Physical transmission of bits
- Defines cables, voltages, connectors
- Device: Hub, repeater

### 12. Explain any two error correction codes in detail with a suitable example.

**1. Hamming Code**

Detects and corrects single-bit errors using parity bits at power-of-2 positions.

**Example: 4-bit data 1011**
- Need 3 parity bits (2³ ≥ 4+3+1)
- Positions: P1(1), P2(2), D1(3), P4(4), D2(5), D3(6), D4(7)
- Data: D1=1, D2=0, D3=1, D4=1

Calculate parity (even):
- P1 covers 1,3,5,7: P1=0
- P2 covers 2,3,6,7: P2=1  
- P4 covers 4,5,6,7: P4=0

**Transmitted: 0110011**

Error detection: If bit 5 flips, parity checks identify position 5, correct by flipping back.

**2. CRC (Cyclic Redundancy Check)**

Uses polynomial division for error detection.

**Example: Data=1101011, Generator=1011**

1. Append 3 zeros: 1101011000
2. Divide by generator using XOR:
   - Remainder = 111
3. Transmitted: 1101011111

At receiver: Divide by generator. If remainder=0, no error; else error detected.

### 13. Write a detailed note on sliding window protocol.

**Sliding Window Protocol** - Flow control mechanism for reliable transmission.

**Types:**

**1. Go-Back-N (GBN)**
- Sender window: N frames
- Receiver window: 1 frame
- Accepts only in-order frames
- Error: discard frame and all subsequent
- Retransmit from error frame onwards

**Example:**
Sent: F0,F1,F2,F3,F4. F2 error → Receiver discards F2,F3,F4 → Retransmit F2,F3,F4

**2. Selective Repeat (SR)**
- Both windows: N frames
- Accepts out-of-order frames
- Buffers correctly received frames
- Retransmits only damaged frames

**Example:**
Sent: F0,F1,F2,F3,F4. F2 error → Buffer F3,F4 → Retransmit only F2

**Window Sliding:**
- Sender: [SF, SF+N-1], slides on ACK
- Receiver: [RF, RF+N-1], slides on in-order receipt
- Enables pipelining and efficiency

### 14. Illustrate the working mechanism of distance vector routing with suitable example.

**Distance Vector Routing** - Uses Bellman-Ford algorithm; routers share tables with neighbors.

**Algorithm:** D(x,y) = min{c(x,v) + D(v,y)}

**Example Network:**
```
[A]--2--[B]--3--[C]
 |       |       |
 1       1       1
 |       |       |
[D]--4--[E]--2--[F]
```

**Initial Router A:**
| Dest | Cost | Next |
|------|------|------|
| A    | 0    | -    |
| B    | 2    | B    |
| D    | 1    | D    |

**After Exchange:**
A learns C via B: cost(A,B)+cost(B,C)=2+3=5
A learns E via B: 2+1=3 or via D: 1+4=5 (choose B)

**Updated A:**
| Dest | Cost | Next |
|------|------|------|
| C    | 5    | B    |
| E    | 3    | B    |

**Problems:**
- Count-to-infinity (Solution: hop limit)
- Routing loops (Solution: split horizon, route poisoning)

**Protocol:** RIP

### 15. Illustrate the working mechanism of link state routing with an example.

**Link State Routing** - Each router has complete topology; uses Dijkstra's algorithm.

**Steps:**
1. Discover neighbors (HELLO packets)
2. Create LSP (Link State Packet)
3. Flood LSP to all routers
4. Build topology database
5. Run Dijkstra's algorithm

**Example Network:**
```
[A]--1--[B]--2--[C]
 |       |       |
 4       3       1
 |       |       |
[D]--2--[E]--1--[F]
```

**Dijkstra from A:**

Init: N'={A}, D(B)=1, D(D)=4, others=∞

Iteration 1: Add B, N'={A,B}
- D(C)=min(∞,1+2)=3
- D(E)=min(∞,1+3)=4

Iteration 2: Add C, N'={A,B,C}
- D(F)=min(∞,3+1)=4

Continue until all nodes added.

**Final A Table:**
| Dest | Cost | Path    |
|------|------|---------|
| B    | 1    | A→B     |
| C    | 3    | A→B→C   |
| D    | 4    | A→D     |
| E    | 4    | A→B→E   |
| F    | 4    | A→B→C→F |

**Protocol:** OSPF, IS-IS

### 16. Explain the issues in connection establishment and connection tear down in transport layer.

**Connection Establishment Issues (TCP 3-Way Handshake):**

**Process:** SYN → SYN-ACK → ACK

**Issues:**
1. **Delayed Duplicates** - Old SYN packets arrive late (Solution: unique sequence numbers)
2. **SYN Flooding** - DDoS attack exhausts resources (Solution: SYN cookies)
3. **Half-Open Connections** - Client crashes after SYN (Solution: timeouts)

**Connection Tear Down Issues (4-Way Termination):**

**Process:** FIN → ACK → FIN → ACK

**Issues:**
1. **TIME_WAIT State** - Port occupied for 2×MSL (2-4 minutes) ensuring last ACK reaches
2. **Lost FIN** - Requires retransmission
3. **Half-Close** - One side closes while other still sends
4. **Simultaneous Close** - Both send FIN simultaneously
5. **Abrupt Termination (RST)** - Immediate close, potential data loss

**Other Issues:**
- Packet reordering from old connections
- Resource exhaustion
- Sequence number wrap-around

### 17. Explain the packet structure of UDP.

**UDP Header:** 8 bytes fixed

```
 0                   16                  31
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Source Port   | Destination Port    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Length      |     Checksum        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Data (Payload)              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Fields:**

1. **Source Port (16 bits)** - Sending application port, optional (can be 0)
2. **Destination Port (16 bits)** - Receiving application port, mandatory
3. **Length (16 bits)** - Total packet length (header + data), min=8, max=65535
4. **Checksum (16 bits)** - Error detection (optional IPv4, mandatory IPv6)
5. **Data** - Application payload, max=65527 bytes

**Checksum includes:** Pseudo-header (IP addresses, protocol) + UDP header + data

**Characteristics:**
- Connectionless, unreliable
- No flow/congestion control
- Minimal overhead
- Used for: DNS, DHCP, VoIP, streaming

### 18. Explain various congestion control techniques adopted in transport layer with example.

**1. Leaky Bucket**
- Packets enter at variable rate, leave at constant rate
- Bucket capacity finite; overflow drops packets
- Smooths traffic

**Example:**
```
Capacity: 1000 bytes, Output: 100 bytes/sec
Input 500 → Bucket 500
Input 400 → Bucket 800 (after 1 sec output)
Input 500 → 400 dropped (overflow)
```

**2. Token Bucket**
- Tokens generated at fixed rate
- Packet transmission requires tokens
- Allows controlled bursts

**Example:**
```
Rate: 50 tokens/sec, Capacity: 500
Burst 200 bytes → Send (300 tokens left)
Burst 600 bytes → Send 500, drop 100
```

**3. TCP Congestion Control**

**a) Slow Start**
- Start cwnd=1 MSS
- Double cwnd per RTT (exponential)
- Until ssthresh reached

**b) Congestion Avoidance**
- Linear increase: cwnd+1 per RTT
- After reaching ssthresh

**c) Fast Retransmit**
- 3 duplicate ACKs → immediate retransmit

**d) Fast Recovery**
- Set ssthresh=cwnd/2
- Set cwnd=ssthresh+3
- Continue without slow start

**Example:**
```
Slow Start: cwnd = 1→2→4→8→16
Congestion Avoidance: 17→18→19
Timeout: ssthresh=9, cwnd=1, restart
```

**4. AIMD (Additive Increase Multiplicative Decrease)**
- Increase: cwnd+1 (linear)
- Decrease: cwnd/2 (on congestion)

**5. ECN (Explicit Congestion Notification)**
- Routers mark packets instead of dropping
- Early congestion signal

**6. RED (Random Early Detection)**
- Probabilistic packet dropping based on queue length
- Prevents global synchronization

### 19. Explain the concept of simple mail transfer protocol emphasizing user agent and mail transfer agent.

**SMTP** - Email transfer protocol using TCP port 25.

**Components:**

**1. User Agent (UA/MUA)**
- Email client software
- Functions: Compose, read, organize, send emails
- Examples: Outlook, Thunderbird, Gmail web

**2. Mail Transfer Agent (MTA)**
- Mail server routing/delivering emails
- Functions: Accept, queue, route, relay, deliver
- Examples: Postfix, Sendmail, Exchange

**Email Flow: alice@example.com → bob@company.com**

**Phase 1: Submission (UA to MTA)**
1. Alice composes in UA
2. UA connects to example.com MTA (port 587)
3. Authenticates and submits via SMTP
4. MTA queues message

**Phase 2: Transfer (MTA to MTA)**
1. example.com queries DNS for company.com MX record
2. Connects to mail.company.com (port 25)
3. SMTP conversation:
```
S: 220 Ready
C: HELO example.com
C: MAIL FROM:<alice@example.com>
C: RCPT TO:<bob@company.com>
C: DATA
C: [message content]
C: .
S: 250 OK
C: QUIT
```
4. company.com stores in Bob's mailbox

**Phase 3: Retrieval (MTA to UA)**
- Bob's UA uses POP3/IMAP to retrieve
- Email displayed

**SMTP Commands:** HELO, MAIL FROM, RCPT TO, DATA, QUIT

**Retrieval Protocols:**
- **POP3**: Downloads, deletes from server
- **IMAP**: Keeps on server, synchronizes

### 20. Explain the components and architecture of DNS. Also mention the features.

**DNS** - Distributed hierarchical system translating domain names to IP addresses.

**Architecture:**

**Hierarchy:**
```
        [Root]
          |
    [.com][.org][.edu]
       |
   [example]
       |
     [www]
```

**Components:**

**1. DNS Resolver** - Queries on client's behalf, caches results

**2. Root Servers** - 13 systems (A-M), direct to TLD servers

**3. TLD Servers** - Manage .com, .org, .edu, country codes

**4. Authoritative Servers** - Store actual DNS records for domains

**Query Process: www.example.com**
```
1. Client → Resolver
2. Resolver → Root: "Where is .com?"
3. Root → ".com at x.x.x.x"
4. Resolver → .com TLD: "Where is example.com?"
5. TLD → "ns1.example.com at y.y.y.y"
6. Resolver → ns1.example.com: "What is www?"
7. ns1 → "93.184.216.34"
8. Resolver → Client: Answer
```

**DNS Records:**
- **A**: Domain → IPv4
- **AAAA**: Domain → IPv6
- **CNAME**: Alias
- **MX**: Mail server
- **NS**: Name server
- **TXT**: Text info

**Features:**

**1. Scalability** - Distributed, hierarchical, billions of domains

**2. Redundancy** - Multiple servers at each level

**3. Caching** - TTL-based, reduces latency and traffic

**4. Load Distribution** - Round-robin DNS

**5. Security (DNSSEC)** - Digital signatures, prevents spoofing

**6. Dynamic Updates** - Real-time zone changes

**7. Reverse DNS** - IP → domain name

**Protocol:** UDP port 53 (queries), TCP port 53 (zone transfers)

---

**End of Assignment**