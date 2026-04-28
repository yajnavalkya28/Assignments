# Smart Water Tank — ML Model: Complete Technical Explanation

> **Project:** Smart Water Tank System  
> **ML Framework:** TensorFlow.js (runs in browser)  
> **Model Type:** Feedforward Dense Neural Network (Multilayer Perceptron)  
> **Task:** Regression — predict optimal pump-ON threshold from drain rate  

---

## 1. Why Machine Learning at All?

The pump in this system needs to know **when to turn ON**. The naive approach is a fixed threshold — say, always turn the pump on when the tank drops below 20%. That works, but it's rigid.

Consider two real households:
- **Household A** drains 0.1% of the tank per second (slow usage — small family, careful).
- **Household B** drains 1.5% per second (large family, frequent usage).

If both use a 20% threshold, Household B risks running completely dry before the pump finishes filling because usage is so fast. Household B actually needs the pump to kick in at maybe 45–50% to stay safe. Household A is fine with 15%.

The ML model solves this by **watching how fast water is actually being consumed** and dynamically adjusting the threshold to match real usage behaviour. This is **adaptive control** — the system learns the environment it's running in.

---

## 2. What Problem Type Is This?

This is a **supervised regression** problem.

| Concept | Value |
|---|---|
| Input (X) | Observed drain rate in `% per second` |
| Output (Y) | Recommended pump-ON threshold in `%` |
| Type | Regression (continuous output, not a class label) |
| Learning style | Supervised (we supply target labels via a heuristic formula) |

It is **not** classification (we're not predicting "ON/OFF"), it's **not** clustering (we're not grouping anything), and it's **not** unsupervised (we do provide target values during training).

---

## 3. The Model — Feedforward Dense Neural Network (MLP)

### What is a Dense Neural Network?

A **Dense** (also called Fully Connected) layer is one where **every neuron in one layer connects to every neuron in the next layer**. A stack of dense layers with non-linear activations is called a **Multilayer Perceptron (MLP)** — one of the oldest and most fundamental neural network architectures.

Each neuron computes:

```
output = activation(W · x + b)
```

Where `W` are learned weights, `x` is the input vector, `b` is a learned bias, and `activation` is a non-linear function. Training adjusts `W` and `b` via backpropagation to minimise the loss.

### Why MLP and not something else?

| Alternative | Why not used |
|---|---|
| Linear Regression | Can't capture non-linear relationships between drain rate and threshold |
| Decision Tree / Random Forest | Overkill, not available natively in TF.js easily, poor extrapolation |
| LSTM / RNN | Time-series model — unnecessary complexity for a single scalar input |
| SVM | Not natively supported in TF.js browser environment |
| **MLP (chosen)** | Simple, runs in browser, handles non-linearity, generalises well |

The relationship between drain rate and optimal threshold is **non-linear** — doubling the drain rate doesn't exactly double the ideal threshold. An MLP with ReLU activations can approximate any continuous non-linear function (Universal Approximation Theorem), making it the right tool here.

### Architecture

```
Input Layer  →  Hidden Layer 1  →  Hidden Layer 2  →  Output Layer
  1 neuron       8 neurons, ReLU    8 neurons, ReLU     1 neuron (linear)
```

```javascript
mlModel = tf.sequential();
mlModel.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [1] }));
mlModel.add(tf.layers.dense({ units: 8, activation: 'relu' }));
mlModel.add(tf.layers.dense({ units: 1 }));
```

**`tf.sequential()`** creates a model where layers are stacked one after another in a straight line — input flows forward through each layer to produce an output. No branching, no skip connections.

**Input shape `[1]`** — the model takes a single number as input: the drain rate (e.g., `0.5` means the tank loses 0.5% per second).

**Two hidden layers of 8 neurons each** — 8 is enough to learn the smooth curve between drain rate and threshold without being oversized. Using more neurons or layers would add unnecessary complexity and risk overfitting on the tiny dataset (at most 20 samples).

**Output layer: 1 neuron, no activation** — because this is regression. We want a raw number (the threshold %). Adding an activation like sigmoid would squash the output between 0 and 1, which is wrong here.

### Total Parameters

- Layer 1: `(1 input × 8 neurons) + 8 biases = 16 parameters`
- Layer 2: `(8 inputs × 8 neurons) + 8 biases = 72 parameters`
- Layer 3: `(8 inputs × 1 neuron) + 1 bias = 9 parameters`
- **Total: 97 trainable parameters**

This is an intentionally tiny model. Even a cheap microcontroller could run inference on 97 parameters. The browser runs it in microseconds.

---

## 4. Activation Function — ReLU

```javascript
activation: 'relu'
```

**ReLU = Rectified Linear Unit**

```
ReLU(x) = max(0, x)
```

- If the input is negative → outputs 0
- If the input is positive → outputs the value unchanged

**Why ReLU specifically?**

1. **Non-linearity:** Without activation functions, stacking dense layers would just be matrix multiplication — equivalent to a single linear layer. ReLU breaks linearity so the network can learn curves.

2. **No vanishing gradient:** Sigmoid and tanh activations squash values into small ranges, causing gradients to shrink to near-zero during backpropagation (vanishing gradient problem). ReLU's gradient is either 0 or 1 — it doesn't compress gradients.

3. **Computationally cheap:** `max(0, x)` is one of the simplest operations possible. In a browser running 60fps simulation + rendering, this matters.

4. **Works well for regression tasks** where inputs and targets are non-negative or unbounded — drain rates are always ≥ 0, thresholds are always > 0.

**The output layer has no activation** — this is called a **linear activation**. We want the network to output any positive real number representing a percentage, not a squashed value.

---

## 5. Loss Function — Mean Squared Error (MSE)

```javascript
loss: 'meanSquaredError'
```

MSE measures the average squared difference between predicted and actual threshold values:

```
MSE = (1/n) × Σ (predicted_threshold - actual_threshold)²
```

**Why MSE?**

- This is a **regression task** — MSE is the standard loss for regression.
- **Squaring** the error means large mistakes are penalised much more heavily than small ones. Being 20% off on a threshold (e.g., predicting 30% when it should be 50%) is catastrophically worse than being 2% off. Squaring enforces that.
- MSE is **smooth and differentiable everywhere**, which means gradients can be computed cleanly for backpropagation.
- Alternative: Mean Absolute Error (MAE) treats all error magnitudes equally — less appropriate here where large threshold errors have serious real-world consequences (tank runs dry).

---

## 6. Optimizer — Adam

```javascript
optimizer: tf.train.adam(0.01)
```

**Adam = Adaptive Moment Estimation**

Adam is the most widely used optimizer in modern deep learning. It combines two ideas:

1. **Momentum** — keeps a running average of past gradients to smooth updates and avoid oscillation.
2. **RMSProp** — adapts the learning rate individually for each weight based on the magnitude of recent gradients. Weights that have been getting large gradients get smaller learning rates; weights with small gradients get larger learning rates.

Adam update rule (simplified):

```
m = β₁ × m + (1 - β₁) × gradient          ← 1st moment (mean)
v = β₂ × v + (1 - β₂) × gradient²         ← 2nd moment (variance)
weight = weight - lr × m / (√v + ε)
```

Default: `β₁ = 0.9`, `β₂ = 0.999`, `ε = 1e-7`

**Why Adam and not plain SGD?**

Plain Stochastic Gradient Descent (SGD) uses the same learning rate for every weight and every step. On small, irregular datasets like this (at most 20 samples), SGD is slow to converge and sensitive to learning rate choice. Adam adapts automatically and converges much faster — critical here because retraining happens live every few seconds inside a running simulation.

**Learning rate `0.01`:**

- Too high (e.g., 0.1) → weights overshoot the minimum, training diverges.
- Too low (e.g., 0.0001) → training is extremely slow, threshold barely updates.
- `0.01` is a good middle ground: fast enough to adapt in 30 epochs during live retraining, stable enough not to erase pre-trained knowledge violently.

---

## 7. Phase 1 — Pre-Training with Synthetic Data

```javascript
async function initML() {
    mlModel = tf.sequential();
    mlModel.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [1] }));
    mlModel.add(tf.layers.dense({ units: 8, activation: 'relu' }));
    mlModel.add(tf.layers.dense({ units: 1 }));
    mlModel.compile({ optimizer: tf.train.adam(0.01), loss: 'meanSquaredError' });

    const xs = tf.tensor2d([[0.0],[0.1],[0.2],[0.5],[0.8],[1.0],[1.5],[2.0],[2.5],[3.0]]);
    const ys = tf.tensor2d([[12],[15],[18],[24],[30],[36],[44],[52],[60],[68]]);
    await mlModel.fit(xs, ys, { epochs: 200, verbose: 0 });
    xs.dispose();
    ys.dispose();
    mlReady = true;
}
```

### The Synthetic Dataset

| Drain Rate (%/s) | Target Threshold (%) | Reasoning |
|---|---|---|
| 0.0 | 12 | Almost no usage — low threshold is safe |
| 0.1 | 15 | Very slow drain |
| 0.2 | 18 | Slow drain |
| 0.5 | 24 | Moderate drain |
| 0.8 | 30 | Getting faster |
| 1.0 | 36 | Significant usage |
| 1.5 | 44 | High usage |
| 2.0 | 52 | Very high |
| 2.5 | 60 | Rapid consumption |
| 3.0 | 68 | Extreme drain rate |

These 10 pairs are hand-engineered based on domain knowledge — the faster water is consumed, the earlier the pump must turn on to prevent the tank from emptying. The relationship is intentionally non-linear (rate doubles from 0.5→1.0 but threshold goes from 24→36, not 48).

### Why Pre-Train?

Without pre-training, the model starts with **random weights** (Xavier/Glorot initialisation by default in TF.js). If a user opens the simulation and immediately the model is asked for a threshold, it would return a meaningless number.

Pre-training bakes in **domain knowledge as initial weights**. The model already "knows" the general curve before seeing a single real observation. When real data arrives, it fine-tunes from this sensible starting point rather than from random noise.

### `200 epochs` — Why?

An epoch is one full pass through all training samples. With only 10 samples and a simple curve to fit, 200 epochs is sufficient to converge the loss to near-zero. More epochs would overfit; fewer would leave the model poorly calibrated. In the browser this takes under 500ms.

### `tf.tensor2d` and Memory Management

```javascript
const xs = tf.tensor2d([[0.0],[0.1],...]);  // shape: [10, 1]
const ys = tf.tensor2d([[12],[15],...]);     // shape: [10, 1]
// ...
xs.dispose();  // ← critical
ys.dispose();  // ← critical
```

TensorFlow.js manages GPU/WebGL memory separately from JavaScript's garbage collector. Tensors created with `tf.tensor2d` are **not automatically freed** when they go out of scope. Calling `.dispose()` manually releases the memory. Forgetting this causes memory leaks that accumulate over the simulation's lifetime.

---

## 8. Measuring Real Usage — Drain Rate Sampling

Before the ML model can retrain on real data, the simulation must measure how fast water is actually being consumed. This happens inside the main game loop:

```javascript
// Inside gameLoop(), runs every 100ms
if (valveOpen && !motorOn) {
    drainAccum += (lastLevel - waterLevel);   // accumulate % lost
    drainTime  += 0.1;                        // accumulate time in seconds

    if (drainTime >= 5) {                     // sample every 5 seconds
        const rate = drainAccum / drainTime;  // % per second
        if (rate > 0) {
            usageRateSamples.push(rate);

            // Rolling window: keep only last 20 samples
            if (usageRateSamples.length > 20) usageRateSamples.shift();

            // Trigger retraining every 3 new samples
            if (usageRateSamples.length % 3 === 0) {
                retrainML().then(() => { ... });
            }
        }
        drainAccum = 0;
        drainTime  = 0;
    }
} else {
    drainAccum = 0;   // reset if conditions not met
    drainTime  = 0;
}
lastLevel = waterLevel;
```

### Why Only Measure When `valveOpen && !motorOn`?

If the motor is also running while the valve is open, the observed level change is:

```
net_change = fill_rate - drain_rate
```

This net rate is **not** the true consumption rate. We need to isolate pure drain. The condition `valveOpen && !motorOn` guarantees we're only counting what the user is consuming, not what the pump is adding.

### 5-Second Sample Window

Rather than measuring rate tick-by-tick (every 100ms), the code accumulates drain over 5 seconds and computes a single rate. This **smooths out noise** — a single 100ms tick might show an unusually large or small drop due to floating point arithmetic or simulation timing jitter. Averaging over 5 seconds gives a stable, representative number.

### Rolling Window of 20 Samples

```javascript
if (usageRateSamples.length > 20) usageRateSamples.shift();
```

`Array.shift()` removes the oldest element. This keeps the dataset capped at the 20 most recent samples. The effect is that the model **forgets old behaviour and adapts to recent usage**. If you've been draining slowly for a while but suddenly start draining fast, old slow-drain samples are eventually evicted and the model recalibrates to the new pattern within 20 samples (~100 seconds of drain time).

---

## 9. Phase 2 — Live Retraining

```javascript
async function retrainML() {
    if (!mlReady || usageRateSamples.length < 3) return;

    const pairs = usageRateSamples.map(r => {
        const ideal = Math.min(70, Math.max(10, 12 + r * 22));
        return [r, ideal];
    });

    const xs = tf.tensor2d(pairs.map(p => [p[0]]));
    const ys = tf.tensor2d(pairs.map(p => [p[1]]));
    await mlModel.fit(xs, ys, { epochs: 30, verbose: 0 });
    xs.dispose();
    ys.dispose();
    mlEpoch++;
}
```

### The Label Generation Heuristic

```javascript
const ideal = Math.min(70, Math.max(10, 12 + r * 22));
```

For each observed drain rate `r`, we compute what the ideal threshold **should be** using this formula:

```
ideal_threshold = clamp(12 + r × 22, min=10, max=70)
```

| rate | raw value | clamped |
|---|---|---|
| 0.2 | 12 + 4.4 = 16.4 | 16.4% |
| 0.5 | 12 + 11 = 23 | 23% |
| 1.0 | 12 + 22 = 34 | 34% |
| 2.0 | 12 + 44 = 56 | 56% |
| 3.5 | 12 + 77 = 89 → clamped | 70% |

The clamp to `[10, 70]` is a **safety guard**:
- Below 10% threshold makes no sense — the pump wouldn't activate early enough.
- Above 70% threshold means the pump would be running almost constantly.

This heuristic converts raw observations into supervised labels. The model then learns to approximate this formula — but because it's a neural network with weights shaped by the pre-training data, it can **interpolate and extrapolate** to drain rates it hasn't seen, with a smooth curve rather than the exact linear formula.

### Why Only 30 Epochs for Retraining?

The model already has good weights from pre-training. Retraining is just **fine-tuning** — nudging weights toward the new data. 30 epochs is enough to meaningfully update without:
- Taking too long (the simulation is live, retraining runs asynchronously but still uses CPU/GPU).
- Catastrophically forgetting pre-trained knowledge (too many epochs on a tiny dataset would cause the model to overfit to just those 3–20 samples and lose its general understanding).

### Minimum 3 Samples Guard

```javascript
if (!mlReady || usageRateSamples.length < 3) return;
```

Training a neural network on 1 or 2 data points is meaningless — it would just memorise those exact values with no generalisation. 3 samples is a bare minimum to get a meaningful gradient update.

### Retraining Frequency

```javascript
if (usageRateSamples.length % 3 === 0) {
    retrainML().then(...);
}
```

Retraining is triggered every time 3 more samples accumulate (i.e., every 15 seconds of drain time). This balances responsiveness (adapting quickly to usage changes) against computational cost (retraining on every single sample would be wasteful and could cause the UI to stutter).

---

## 10. Prediction

```javascript
async function predictThreshold(rate) {
    if (!mlReady) return mlThreshold;   // fallback if model not loaded

    const inp = tf.tensor2d([[rate]]);
    const out = mlModel.predict(inp);
    const val = out.dataSync()[0];

    inp.dispose();
    out.dispose();

    return Math.max(10, Math.min(75, val));
}
```

### Step by Step

1. **`tf.tensor2d([[rate]])`** — wraps the scalar drain rate into a 2D tensor of shape `[1, 1]` (1 sample, 1 feature). TF.js always expects batched input — even single predictions need the batch dimension.

2. **`mlModel.predict(inp)`** — runs the forward pass. The rate flows through Layer 1 (8 ReLU neurons) → Layer 2 (8 ReLU neurons) → Output (1 linear neuron) and produces a single predicted threshold value.

3. **`out.dataSync()[0]`** — synchronously reads the tensor value back into a plain JavaScript number. `dataSync()` blocks until the WebGL computation finishes (as opposed to `data()` which returns a Promise). For a single scalar output, the synchronous version is fine and simpler.

4. **`.dispose()`** — releases both tensors from GPU memory.

5. **Final clamp `Math.max(10, Math.min(75, val))`** — even after training, the network could theoretically output a nonsensical value (e.g., -3 or 110) due to unusual input. The clamp ensures the threshold always stays within a physically sensible range.

### Where Is Prediction Called?

```javascript
retrainML().then(() => {
    const avgRate = usageRateSamples.reduce((a,b) => a+b, 0) / usageRateSamples.length;
    predictThreshold(avgRate).then(t => {
        mlThreshold = t;
        document.getElementById('ml-thresh-val').textContent = Math.round(t);
    });
});
```

After every retraining cycle, prediction is called with the **average of all current samples** (not just the latest one). Averaging smooths out any outlier samples and gives the model a representative overall drain rate to predict from.

---

## 11. How the Threshold Is Used

```javascript
// In gameLoop(), AUTO mode logic:
if (isAuto) {
    if (waterLevel < mlThreshold) motorOn = true;   // pump ON
    if (waterLevel >= 95)         motorOn = false;  // pump OFF when full
}
```

The `mlThreshold` value (continuously updated by the ML pipeline) directly controls when the pump activates. The system thus forms a **closed feedback loop**:

```
Observe drain rate → Retrain model → Predict new threshold → Control pump → Affects water level → Observe drain rate → ...
```

---

## 12. Custom Threshold Override

```javascript
function applyCustomThresh() {
    const val = parseInt(document.getElementById('custom-thresh-input').value);
    if (isNaN(val) || val < 5 || val > 90) { /* show error */ return; }
    useCustomThresh = true;
    mlThreshold = val;  // bypass ML
}

function resetToML() {
    useCustomThresh = false;  // re-enable ML
}
```

The user can override the ML threshold with a manual value at any time. The `useCustomThresh` flag pauses ML updates to `mlThreshold` — the model keeps running and retraining in the background, but its output is ignored until `resetToML()` is called. This is a sensible safety valve — the user always has final control over pump behaviour.

---

## 13. Full ML Pipeline Flow

```
page load
    └── initML()
            ├── build model (2 hidden layers, 8 neurons each, ReLU)
            ├── compile (Adam 0.01, MSE loss)
            └── pre-train 200 epochs on 10 synthetic (rate, threshold) pairs
                    └── mlReady = true

every 100ms tick (gameLoop)
    └── if valve open AND motor off:
            ├── accumulate drain over 5 seconds
            └── compute rate = total_drop / elapsed_time
                    ├── push to usageRateSamples (max 20)
                    └── if samples count % 3 == 0:
                            └── retrainML()
                                    ├── generate labels: ideal = clamp(12 + rate×22, 10, 70)
                                    ├── fit model 30 epochs on all current samples
                                    └── predictThreshold(avgRate)
                                            ├── forward pass through network
                                            ├── clamp output to [10, 75]
                                            └── mlThreshold = result
                                                    └── pump turns ON when waterLevel < mlThreshold
```

---

## 14. Design Decisions Summary

| Decision | Choice | Justification |
|---|---|---|
| Framework | TensorFlow.js | Runs entirely in browser, no server required |
| Model | Dense MLP | Simple regression, tiny data, universal approximation |
| Hidden layers | 2 × 8 ReLU | Enough capacity, avoids overfitting on ≤20 samples |
| Output activation | None (linear) | Regression output, not bounded |
| Loss | MSE | Regression task, penalises large errors heavily |
| Optimizer | Adam 0.01 | Fast convergence on small, irregular datasets |
| Pre-training | 200 epochs, 10 synthetic samples | Sensible baseline before any real data exists |
| Live retraining | Every 3 samples, 30 epochs | Responsive adaptation, minimal compute cost |
| Sample window | 20 samples rolling | Forgets stale behaviour, adapts to recent usage |
| Sampling interval | 5 seconds | Smooths noise, representative drain rate |
| Label formula | `12 + rate × 22` clamped [10, 70] | Domain-knowledge heuristic for supervised labels |
| Prediction input | Average of all samples | Reduces outlier influence |
| Output clamp | [10, 75] | Prevents physically nonsensical thresholds |
| Memory management | Manual `.dispose()` | TF.js tensors don't garbage collect automatically |

---

## 15. Limitations and What Could Be Improved

**Current limitations:**

- The label generation formula `12 + rate × 22` is a fixed heuristic — the model is essentially learning to approximate a straight line, which an MLP is arguably overkill for.
- The model resets completely on page refresh since weights are stored only in memory.
- Only one feature (drain rate) is used. Time-of-day, historical patterns, day-of-week would make predictions much smarter.
- 20 samples is an extremely small dataset — the model's generalisation outside the observed range is entirely determined by pre-training.

**Potential improvements:**

- Save and reload model weights using `model.save('localstorage://water-tank-ml')` and `tf.loadLayersModel(...)` to persist learning across sessions.
- Add more input features: current water level, time since last fill, fill frequency.
- Use a proper time-series approach (LSTM) if collecting many sequential observations.
- Replace the fixed heuristic label formula with a proper feedback mechanism — e.g., penalise configurations where the tank actually ran dry.
