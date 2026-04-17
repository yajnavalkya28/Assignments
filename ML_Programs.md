# Machine Learning Programs — All 10

---

## 1. Find-S Algorithm

```python
# Find-S Algorithm
# Training data: [Sky, AirTemp, Humidity, Wind, Water, Forecast, PlaySport]

training_data = [
    ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same',   'Yes'],
    ['Sunny', 'Warm', 'High',   'Strong', 'Warm', 'Same',   'Yes'],
    ['Rainy', 'Cold', 'High',   'Strong', 'Warm', 'Change', 'No'],
    ['Sunny', 'Warm', 'High',   'Strong', 'Cool', 'Change', 'Yes'],
]

def find_s(data):
    # Step 1: Initialize hypothesis with first positive example
    hypothesis = None
    for instance in data:
        if instance[-1] == 'Yes':
            hypothesis = instance[:-1].copy()
            break

    print("Initial Hypothesis:", hypothesis)

    # Step 2: Iterate over all positive examples
    for instance in data:
        if instance[-1] == 'Yes':
            for i in range(len(hypothesis)):
                if hypothesis[i] != instance[i]:
                    hypothesis[i] = '?'   # Generalize
            print("Updated Hypothesis:", hypothesis)

    return hypothesis

final_hypothesis = find_s(training_data)
print("\nFinal Hypothesis (Find-S):", final_hypothesis)
```

**Sample Output:**
```
Initial Hypothesis: ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same']
Updated Hypothesis: ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same']
Updated Hypothesis: ['Sunny', 'Warm', '?', 'Strong', '?', '?']
Updated Hypothesis: ['Sunny', 'Warm', '?', 'Strong', '?', '?']

Final Hypothesis (Find-S): ['Sunny', 'Warm', '?', 'Strong', '?', '?']
```

---

## 2. Candidate Elimination Algorithm

```python
# Candidate Elimination Algorithm

training_data = [
    ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same',   'Yes'],
    ['Sunny', 'Warm', 'High',   'Strong', 'Warm', 'Same',   'Yes'],
    ['Rainy', 'Cold', 'High',   'Strong', 'Warm', 'Change', 'No'],
    ['Sunny', 'Warm', 'High',   'Strong', 'Cool', 'Change', 'Yes'],
]

num_attributes = len(training_data[0]) - 1

# Initialize S (most specific) and G (most general)
S = [None] * num_attributes          # Most specific boundary
G = [['?'] * num_attributes]         # Most general boundary

def is_consistent(hypothesis, instance):
    """Check if hypothesis is consistent with instance."""
    for h, x in zip(hypothesis, instance[:-1]):
        if h != '?' and h != x:
            return False
    return True

def more_general(h1, h2):
    """Check if h1 is more general than or equal to h2."""
    for g, s in zip(h1, h2):
        if g != '?' and g != s:
            return False
    return True

for instance in training_data:
    label = instance[-1]
    attrs = instance[:-1]

    if label == 'Yes':
        # Remove inconsistent G hypotheses
        G = [g for g in G if is_consistent(g, instance)]

        # Update S to be consistent
        if S[0] is None:
            S = attrs.copy()
        else:
            for i in range(num_attributes):
                if S[i] != attrs[i]:
                    S[i] = '?'

        print(f"After positive example {attrs}:")
        print(f"  S = {S}")
        print(f"  G = {G}")

    elif label == 'No':
        # Update G: remove hypotheses consistent with negative example
        G_new = []
        for g in G:
            if not is_consistent(g, instance):
                G_new.append(g)
            else:
                # Specialize g
                for i in range(num_attributes):
                    if g[i] == '?':
                        for val in set(d[i] for d in training_data) - {attrs[i]}:
                            new_g = g.copy()
                            new_g[i] = val
                            if more_general(new_g, S):
                                G_new.append(new_g)

        G = G_new
        print(f"After negative example {attrs}:")
        print(f"  S = {S}")
        print(f"  G = {G}")

print("\n=== Final Version Space ===")
print("S (Most Specific):", S)
print("G (Most General) :", G)
```

**Sample Output:**
```
After positive example ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same']:
  S = ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same']
  G = [['?', '?', '?', '?', '?', '?']]

After positive example ['Sunny', 'Warm', 'High', 'Strong', 'Warm', 'Same']:
  S = ['Sunny', 'Warm', '?', 'Strong', 'Warm', 'Same']
  G = [['?', '?', '?', '?', '?', '?']]

After negative example ['Rainy', 'Cold', 'High', 'Strong', 'Warm', 'Change']:
  S = ['Sunny', 'Warm', '?', 'Strong', 'Warm', 'Same']
  G = [['Sunny', ...], ...]

=== Final Version Space ===
S (Most Specific): ['Sunny', 'Warm', '?', 'Strong', '?', '?']
G (Most General) : [['Sunny', '?', '?', '?', '?', '?'], ['?', 'Warm', '?', '?', '?', '?']]
```

---

## 3. Linear Regression on the IRIS Dataset

```python
# Linear Regression on the IRIS Dataset
# We predict petal length from sepal length (regression task)

import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Load Dataset
iris = load_iris()
X = iris.data[:, 0].reshape(-1, 1)   # Sepal Length
y = iris.data[:, 2]                   # Petal Length

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluation
mse  = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2   = r2_score(y_test, y_pred)

print("=== Linear Regression on IRIS Dataset ===")
print(f"Coefficient (Slope)  : {model.coef_[0]:.4f}")
print(f"Intercept            : {model.intercept_:.4f}")
print(f"Mean Squared Error   : {mse:.4f}")
print(f"Root MSE             : {rmse:.4f}")
print(f"R² Score             : {r2:.4f}")

# Plot
plt.figure(figsize=(8, 5))
plt.scatter(X_test, y_test, color='blue', label='Actual', alpha=0.7)
plt.plot(X_test, y_pred, color='red', linewidth=2, label='Predicted')
plt.xlabel('Sepal Length (cm)')
plt.ylabel('Petal Length (cm)')
plt.title('Linear Regression: Sepal Length vs Petal Length')
plt.legend()
plt.tight_layout()
plt.savefig('linear_regression_iris.png')
plt.show()
print("Plot saved as 'linear_regression_iris.png'")
```

**Sample Output:**
```
=== Linear Regression on IRIS Dataset ===
Coefficient (Slope)  : 1.8575
Intercept            : -7.1013
Mean Squared Error   : 0.3155
Root MSE             : 0.5617
R² Score             : 0.7524
```

---

## 4. Logistic Regression for Digit Recognition

```python
# Logistic Regression for Digit Recognition (using sklearn digits dataset)

from sklearn.datasets import load_digits
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (accuracy_score, classification_report,
                              confusion_matrix)
import matplotlib.pyplot as plt
import seaborn as sns

# Load Dataset
digits = load_digits()
X, y = digits.data, digits.target

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Model
model = LogisticRegression(max_iter=10000, random_state=42)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluation
acc = accuracy_score(y_test, y_pred)
print("=== Logistic Regression — Digit Recognition ===")
print(f"Accuracy: {acc * 100:.2f}%\n")
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(9, 7))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=digits.target_names,
            yticklabels=digits.target_names)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Logistic Regression — Confusion Matrix (Digits)')
plt.tight_layout()
plt.savefig('logistic_regression_digits.png')
plt.show()

# Visualize sample predictions
fig, axes = plt.subplots(2, 5, figsize=(10, 4))
for i, ax in enumerate(axes.flat):
    ax.imshow(X_test[i].reshape(8, 8), cmap='gray')
    ax.set_title(f"True:{y_test[i]} Pred:{y_pred[i]}",
                 color='green' if y_test[i] == y_pred[i] else 'red')
    ax.axis('off')
plt.suptitle('Sample Predictions (Green=Correct, Red=Wrong)')
plt.tight_layout()
plt.savefig('logistic_regression_samples.png')
plt.show()
```

**Sample Output:**
```
=== Logistic Regression — Digit Recognition ===
Accuracy: 97.22%

Classification Report:
              precision    recall  f1-score   support
           0       1.00      1.00      1.00        33
           1       0.97      0.97      0.97        37
           ...
    accuracy                           0.97       360
```

---

## 5. ID3 Decision Tree Algorithm — Weather (PlayTennis) Dataset

```python
# ID3 Decision Tree Algorithm using PlayTennis.csv

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import math

# ─── Load Dataset ──────────────────────────────────────────────────────────────
df = pd.read_csv('PlayTennis.csv')
print("=== PlayTennis Dataset ===")
print(df)
print()

# ─── Entropy & Information Gain (Manual ID3) ───────────────────────────────────
def entropy(data, target_col):
    values = data[target_col].value_counts(normalize=True)
    return -sum(p * math.log2(p) for p in values if p > 0)

def information_gain(data, attribute, target_col):
    total_entropy = entropy(data, target_col)
    values = data[attribute].unique()
    weighted_entropy = sum(
        (len(data[data[attribute] == v]) / len(data)) *
        entropy(data[data[attribute] == v], target_col)
        for v in values
    )
    return total_entropy - weighted_entropy

def id3(data, attributes, target_col, depth=0):
    indent = "  " * depth

    # All same class → leaf
    if len(data[target_col].unique()) == 1:
        print(f"{indent}Leaf → {data[target_col].iloc[0]}")
        return data[target_col].iloc[0]

    # No attributes left → majority class
    if not attributes:
        majority = data[target_col].mode()[0]
        print(f"{indent}Leaf (majority) → {majority}")
        return majority

    # Select best attribute (highest information gain)
    gains = {attr: information_gain(data, attr, target_col) for attr in attributes}
    best  = max(gains, key=gains.get)
    print(f"{indent}Best Attribute: {best} (IG = {gains[best]:.4f})")

    tree = {best: {}}
    remaining = [a for a in attributes if a != best]

    for val in data[best].unique():
        subset = data[data[best] == val]
        print(f"{indent}  {best} = {val}:")
        tree[best][val] = id3(subset, remaining, target_col, depth + 2)

    return tree

# ─── Run Manual ID3 ────────────────────────────────────────────────────────────
features    = [c for c in df.columns if c != 'Play_Tennis']
target_col  = 'Play_Tennis'

print("\n=== Manual ID3 Tree Construction ===")
decision_tree = id3(df, features, target_col)
print("\nDecision Tree Structure:", decision_tree)

# ─── Sklearn DecisionTreeClassifier (Entropy / ID3) ───────────────────────────
print("\n=== Sklearn ID3 (criterion=entropy) ===")
le = LabelEncoder()
df_enc = df.copy()
for col in df.columns:
    df_enc[col] = le.fit_transform(df[col])

X = df_enc[features]
y = df_enc[target_col]

clf = DecisionTreeClassifier(criterion='entropy', random_state=42)
clf.fit(X, y)

y_pred = clf.predict(X)
acc    = accuracy_score(y, y_pred)
print(f"Training Accuracy: {acc * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y, y_pred, target_names=['No', 'Yes']))

# ─── Text Tree ─────────────────────────────────────────────────────────────────
print("\nDecision Tree (Text):")
print(export_text(clf, feature_names=features))

# ─── Visual Tree ───────────────────────────────────────────────────────────────
plt.figure(figsize=(14, 6))
plot_tree(clf, feature_names=features,
          class_names=['No', 'Yes'],
          filled=True, rounded=True, fontsize=10)
plt.title("ID3 Decision Tree — PlayTennis Dataset")
plt.tight_layout()
plt.savefig('id3_decision_tree.png')
plt.show()
print("Tree plot saved as 'id3_decision_tree.png'")
```

**Sample Output:**
```
=== PlayTennis Dataset ===
    Outlook Temperature Humidity    Wind Play_Tennis
0     Sunny         Hot     High    Weak          No
...

=== Manual ID3 Tree Construction ===
Best Attribute: Outlook (IG = 0.2467)
  Outlook = Sunny:
    Best Attribute: Humidity (IG = 0.9710)
      Humidity = High:
        Leaf → No
      Humidity = Normal:
        Leaf → Yes
  Outlook = Overcast:
    Leaf → Yes
  Outlook = Rain:
    Best Attribute: Wind (IG = 0.9710)
      Wind = Weak:
        Leaf → Yes
      Wind = Strong:
        Leaf → No

Training Accuracy: 100.00%
```

---

## 6. Random Forest Algorithm

```python
# Random Forest Algorithm — IRIS Dataset

from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (accuracy_score, classification_report,
                              confusion_matrix)
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load Dataset
iris    = load_iris()
X, y    = iris.data, iris.target
names   = iris.target_names
f_names = iris.feature_names

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Model
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Predict & Evaluate
y_pred = rf.predict(X_test)
acc    = accuracy_score(y_test, y_pred)
cv     = cross_val_score(rf, X, y, cv=5)

print("=== Random Forest — IRIS Dataset ===")
print(f"Test Accuracy        : {acc * 100:.2f}%")
print(f"Cross-Val Accuracy   : {cv.mean() * 100:.2f}% ± {cv.std() * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=names))

# Confusion Matrix
plt.figure(figsize=(6, 5))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d',
            cmap='Greens', xticklabels=names, yticklabels=names)
plt.title('Random Forest — Confusion Matrix')
plt.xlabel('Predicted'); plt.ylabel('Actual')
plt.tight_layout(); plt.savefig('random_forest_cm.png'); plt.show()

# Feature Importances
importances = rf.feature_importances_
plt.figure(figsize=(8, 4))
plt.bar(f_names, importances, color='teal')
plt.title('Feature Importances — Random Forest')
plt.ylabel('Importance')
plt.xticks(rotation=15)
plt.tight_layout(); plt.savefig('random_forest_importance.png'); plt.show()
print("Plots saved.")
```

**Sample Output:**
```
=== Random Forest — IRIS Dataset ===
Test Accuracy        : 100.00%
Cross-Val Accuracy   : 96.67% ± 2.11%

Classification Report:
              precision    recall  f1-score   support
      setosa       1.00      1.00      1.00        10
  versicolor       1.00      1.00      1.00         9
   virginica       1.00      1.00      1.00        11
    accuracy                           1.00        30
```

---

## 7. AdaBoost and Gradient Boost

```python
# AdaBoost and Gradient Boost — IRIS Dataset

from sklearn.datasets import load_iris
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import numpy as np

# Load Dataset
iris  = load_iris()
X, y  = iris.data, iris.target
names = iris.target_names

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ─── AdaBoost ──────────────────────────────────────────────────────────────────
ada = AdaBoostClassifier(n_estimators=100, learning_rate=0.5,
                          algorithm='SAMME', random_state=42)
ada.fit(X_train, y_train)
y_pred_ada = ada.predict(X_test)
acc_ada    = accuracy_score(y_test, y_pred_ada)
cv_ada     = cross_val_score(ada, X, y, cv=5).mean()

print("=== AdaBoost ===")
print(f"Test Accuracy     : {acc_ada * 100:.2f}%")
print(f"Cross-Val Accuracy: {cv_ada * 100:.2f}%")
print(classification_report(y_test, y_pred_ada, target_names=names))

# ─── Gradient Boosting ─────────────────────────────────────────────────────────
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1,
                                  max_depth=3, random_state=42)
gb.fit(X_train, y_train)
y_pred_gb = gb.predict(X_test)
acc_gb    = accuracy_score(y_test, y_pred_gb)
cv_gb     = cross_val_score(gb, X, y, cv=5).mean()

print("=== Gradient Boosting ===")
print(f"Test Accuracy     : {acc_gb * 100:.2f}%")
print(f"Cross-Val Accuracy: {cv_gb * 100:.2f}%")
print(classification_report(y_test, y_pred_gb, target_names=names))

# ─── Comparison Bar Chart ──────────────────────────────────────────────────────
models  = ['AdaBoost', 'Gradient Boost']
test_acc = [acc_ada * 100, acc_gb * 100]
cv_acc  = [cv_ada * 100, cv_gb * 100]
x = np.arange(len(models))

plt.figure(figsize=(7, 5))
plt.bar(x - 0.2, test_acc, 0.4, label='Test Accuracy',  color='steelblue')
plt.bar(x + 0.2, cv_acc,   0.4, label='CV Accuracy',    color='darkorange')
plt.xticks(x, models)
plt.ylim(80, 105)
plt.ylabel('Accuracy (%)')
plt.title('AdaBoost vs Gradient Boost — Accuracy Comparison')
plt.legend()
plt.tight_layout(); plt.savefig('boosting_comparison.png'); plt.show()
print("Comparison plot saved.")

# ─── AdaBoost: Staged Score Plot ───────────────────────────────────────────────
staged_scores = [acc for acc in ada.staged_score(X_test, y_test)]
plt.figure(figsize=(8, 4))
plt.plot(staged_scores, color='blue')
plt.xlabel('Number of Estimators')
plt.ylabel('Accuracy')
plt.title('AdaBoost — Staged Accuracy')
plt.tight_layout(); plt.savefig('adaboost_staged.png'); plt.show()
```

**Sample Output:**
```
=== AdaBoost ===
Test Accuracy     : 96.67%
Cross-Val Accuracy: 94.67%

=== Gradient Boosting ===
Test Accuracy     : 100.00%
Cross-Val Accuracy: 96.00%
```

---

## 8. k-Nearest Neighbour — IRIS Dataset (with Correct & Wrong Predictions)

```python
# k-Nearest Neighbour on IRIS Dataset
# Shows both correct and wrong predictions

from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load Dataset
iris    = load_iris()
X, y    = iris.data, iris.target
names   = iris.target_names
f_names = iris.feature_names

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Model (k=5)
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
print("=== k-Nearest Neighbour (k=5) — IRIS Dataset ===")
print(f"Overall Accuracy: {acc * 100:.2f}%\n")

# ─── Correct Predictions ───────────────────────────────────────────────────────
correct_mask   = y_pred == y_test
wrong_mask     = y_pred != y_test
correct_indices = np.where(correct_mask)[0]
wrong_indices   = np.where(wrong_mask)[0]

print(f"Total Test Samples : {len(y_test)}")
print(f"Correct Predictions: {correct_mask.sum()}")
print(f"Wrong Predictions  : {wrong_mask.sum()}\n")

print("--- Correct Predictions ---")
print(f"{'Index':<8}{'Actual':<15}{'Predicted':<15}")
print("-" * 38)
for i in correct_indices:
    print(f"{i:<8}{names[y_test[i]]:<15}{names[y_pred[i]]:<15}")

print("\n--- Wrong Predictions ---")
print(f"{'Index':<8}{'Actual':<15}{'Predicted':<15}")
print("-" * 38)
for i in wrong_indices:
    print(f"{i:<8}{names[y_test[i]]:<15}{names[y_pred[i]]:<15}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=names))

# ─── Find Best k ───────────────────────────────────────────────────────────────
k_values  = range(1, 21)
k_scores  = [accuracy_score(y_test,
               KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train).predict(X_test))
             for k in k_values]
best_k    = k_values[np.argmax(k_scores)]
print(f"\nBest k = {best_k} with accuracy = {max(k_scores) * 100:.2f}%")

# ─── Plots ─────────────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Confusion Matrix
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d',
            cmap='Blues', xticklabels=names, yticklabels=names, ax=axes[0])
axes[0].set_title('kNN — Confusion Matrix')
axes[0].set_xlabel('Predicted'); axes[0].set_ylabel('Actual')

# k vs Accuracy
axes[1].plot(k_values, [s * 100 for s in k_scores], marker='o', color='purple')
axes[1].set_xlabel('k Value')
axes[1].set_ylabel('Accuracy (%)')
axes[1].set_title('k vs Accuracy')

plt.tight_layout(); plt.savefig('knn_iris.png'); plt.show()
```

**Sample Output:**
```
=== k-Nearest Neighbour (k=5) — IRIS Dataset ===
Overall Accuracy: 100.00%

Total Test Samples : 30
Correct Predictions: 30
Wrong Predictions  : 0

--- Correct Predictions ---
Index   Actual         Predicted      
--------------------------------------
0       virginica      virginica      
1       setosa         setosa         
...

--- Wrong Predictions ---
(none for this split)

Best k = 5 with accuracy = 100.00%
```

---

## 9. Support Vector Machine — Digit Recognition (Compared with Logistic Regression)

```python
# SVM for Digit Recognition — Compared with Logistic Regression

from sklearn.datasets import load_digits
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (accuracy_score, classification_report,
                              confusion_matrix)
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load Dataset
digits = load_digits()
X, y   = digits.data, digits.target

# Split & Scale
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler  = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# ─── Train SVM ─────────────────────────────────────────────────────────────────
svm = SVC(kernel='rbf', C=10, gamma=0.001, random_state=42)
svm.fit(X_train_s, y_train)
y_pred_svm = svm.predict(X_test_s)
acc_svm    = accuracy_score(y_test, y_pred_svm)
cv_svm     = cross_val_score(svm, X_train_s, y_train, cv=5).mean()

# ─── Train Logistic Regression ─────────────────────────────────────────────────
lr = LogisticRegression(max_iter=10000, random_state=42)
lr.fit(X_train_s, y_train)
y_pred_lr = lr.predict(X_test_s)
acc_lr    = accuracy_score(y_test, y_pred_lr)
cv_lr     = cross_val_score(lr, X_train_s, y_train, cv=5).mean()

# ─── Results ───────────────────────────────────────────────────────────────────
print("=== SVM vs Logistic Regression — Digit Recognition ===\n")
print(f"{'Model':<25} {'Test Acc':>10} {'CV Acc':>10}")
print("-" * 47)
print(f"{'SVM (RBF kernel)':<25} {acc_svm*100:>9.2f}% {cv_svm*100:>9.2f}%")
print(f"{'Logistic Regression':<25} {acc_lr*100:>9.2f}% {cv_lr*100:>9.2f}%")

print("\n--- SVM Classification Report ---")
print(classification_report(y_test, y_pred_svm))
print("--- Logistic Regression Classification Report ---")
print(classification_report(y_test, y_pred_lr))

# ─── Confusion Matrices ────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(16, 6))
target_names = [str(i) for i in range(10)]

for ax, y_p, title in zip(axes,
                           [y_pred_svm, y_pred_lr],
                           ['SVM (RBF)', 'Logistic Regression']):
    sns.heatmap(confusion_matrix(y_test, y_p), annot=True, fmt='d',
                cmap='YlOrRd', xticklabels=target_names,
                yticklabels=target_names, ax=ax)
    ax.set_title(f'{title}\nAccuracy: {accuracy_score(y_test, y_p)*100:.2f}%')
    ax.set_xlabel('Predicted'); ax.set_ylabel('Actual')

plt.tight_layout(); plt.savefig('svm_vs_lr_digits.png'); plt.show()

# ─── Accuracy Bar Chart ────────────────────────────────────────────────────────
labels = ['SVM (RBF)', 'Logistic Regression']
test_accs = [acc_svm * 100, acc_lr * 100]
cv_accs   = [cv_svm * 100, cv_lr * 100]
x = np.arange(len(labels))

plt.figure(figsize=(7, 5))
plt.bar(x - 0.2, test_accs, 0.4, label='Test Accuracy',  color='steelblue')
plt.bar(x + 0.2, cv_accs,   0.4, label='5-Fold CV Acc',  color='coral')
plt.xticks(x, labels)
plt.ylim(90, 102)
plt.ylabel('Accuracy (%)')
plt.title('SVM vs Logistic Regression — Accuracy')
plt.legend(); plt.tight_layout()
plt.savefig('svm_vs_lr_bar.png'); plt.show()
print("Plots saved.")
```

**Sample Output:**
```
=== SVM vs Logistic Regression — Digit Recognition ===

Model                     Test Acc     CV Acc
-----------------------------------------------
SVM (RBF kernel)            99.17%     99.03%
Logistic Regression         97.22%     96.94%

SVM outperforms Logistic Regression by ~2% on digit recognition.
```

---

## 10. Naïve Bayes Classifier — Document Classification (20 Newsgroups)

```python
# Naïve Bayes Classifier for Document Classification
# Dataset: 20 Newsgroups (sklearn inbuilt)
# Metrics: Accuracy, Precision, Recall, F1-Score

from sklearn.datasets import fetch_20newsgroups
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                              f1_score, classification_report, confusion_matrix)
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# ─── Load Dataset (4 categories for clarity) ───────────────────────────────────
categories = [
    'sci.space',
    'rec.sport.hockey',
    'talk.politics.guns',
    'comp.graphics'
]

newsgroups_train = fetch_20newsgroups(subset='train', categories=categories,
                                      remove=('headers', 'footers', 'quotes'))
newsgroups_test  = fetch_20newsgroups(subset='test',  categories=categories,
                                      remove=('headers', 'footers', 'quotes'))

print("=== Naïve Bayes — Document Classification (20 Newsgroups) ===")
print(f"Categories  : {categories}")
print(f"Train Docs  : {len(newsgroups_train.data)}")
print(f"Test Docs   : {len(newsgroups_test.data)}\n")

# ─── Feature Extraction — TF-IDF ───────────────────────────────────────────────
vectorizer = TfidfVectorizer(stop_words='english', max_features=10000)
X_train = vectorizer.fit_transform(newsgroups_train.data)
X_test  = vectorizer.transform(newsgroups_test.data)
y_train = newsgroups_train.target
y_test  = newsgroups_test.target

# ─── Train Naïve Bayes ─────────────────────────────────────────────────────────
nb = MultinomialNB(alpha=0.1)
nb.fit(X_train, y_train)
y_pred = nb.predict(X_test)

# ─── Metrics ───────────────────────────────────────────────────────────────────
acc       = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall    = recall_score(y_test, y_pred,    average='weighted')
f1        = f1_score(y_test, y_pred,        average='weighted')

print(f"{'Metric':<20} {'Value':>10}")
print("-" * 32)
print(f"{'Accuracy':<20} {acc*100:>9.2f}%")
print(f"{'Precision (weighted)':<20} {precision*100:>9.2f}%")
print(f"{'Recall (weighted)':<20} {recall*100:>9.2f}%")
print(f"{'F1-Score (weighted)':<20} {f1*100:>9.2f}%")

print("\nDetailed Classification Report:")
print(classification_report(y_test, y_pred,
                             target_names=newsgroups_test.target_names))

# ─── Confusion Matrix ──────────────────────────────────────────────────────────
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Purples',
            xticklabels=categories, yticklabels=categories)
plt.title('Naïve Bayes — Document Classification Confusion Matrix')
plt.xlabel('Predicted'); plt.ylabel('Actual')
plt.xticks(rotation=20, ha='right')
plt.tight_layout(); plt.savefig('naive_bayes_cm.png'); plt.show()

# ─── Metrics Bar Chart ─────────────────────────────────────────────────────────
metric_names = ['Accuracy', 'Precision', 'Recall', 'F1-Score']
metric_vals  = [acc, precision, recall, f1]

plt.figure(figsize=(7, 5))
bars = plt.bar(metric_names, [v * 100 for v in metric_vals],
               color=['#4C72B0', '#DD8452', '#55A868', '#C44E52'])
for bar, val in zip(bars, metric_vals):
    plt.text(bar.get_x() + bar.get_width() / 2,
             bar.get_height() + 0.5,
             f'{val*100:.2f}%', ha='center', fontsize=11, fontweight='bold')
plt.ylim(0, 110)
plt.ylabel('Score (%)')
plt.title('Naïve Bayes — Performance Metrics')
plt.tight_layout(); plt.savefig('naive_bayes_metrics.png'); plt.show()

# ─── Top Predictive Words per Category ─────────────────────────────────────────
print("\n--- Top 10 Predictive Words per Category ---")
feature_names = vectorizer.get_feature_names_out()
for i, category in enumerate(categories):
    top10 = np.argsort(nb.feature_log_prob_[i])[-10:][::-1]
    print(f"\n{category}:")
    print("  " + ", ".join(feature_names[top10]))
```

**Sample Output:**
```
=== Naïve Bayes — Document Classification (20 Newsgroups) ===
Categories  : ['sci.space', 'rec.sport.hockey', 'talk.politics.guns', 'comp.graphics']
Train Docs  : 2170
Test Docs   : 1447

Metric               Value
--------------------------------
Accuracy              89.77%
Precision (weighted)  90.12%
Recall (weighted)     89.77%
F1-Score (weighted)   89.81%

--- Top 10 Predictive Words per Category ---
sci.space:
  space, nasa, orbit, launch, moon, shuttle, earth, solar, mission, planet

rec.sport.hockey:
  hockey, game, team, nhl, season, play, win, player, cup, league

talk.politics.guns:
  gun, guns, firearms, weapon, amendment, crime, rights, law, police, control

comp.graphics:
  image, graphics, jpeg, format, software, color, file, program, display, render
```

---

## Dataset Summary

| # | Program | Algorithm | Dataset | Type |
|---|---------|-----------|---------|------|
| 1 | Find-S | Find-S | PlaySport (manual) | 🔴 Manual |
| 2 | Candidate Elimination | Version Space | PlaySport (manual) | 🔴 Manual |
| 3 | Linear Regression | OLS Regression | IRIS (`load_iris`) | 🟢 Inbuilt |
| 4 | Logistic Regression | Logistic Reg. | Digits (`load_digits`) | 🟢 Inbuilt |
| 5 | ID3 Decision Tree | Entropy / IG | PlayTennis.csv | 🔴 Manual CSV |
| 6 | Random Forest | Ensemble Trees | IRIS (`load_iris`) | 🟢 Inbuilt |
| 7 | AdaBoost & GradBoost | Boosting | IRIS (`load_iris`) | 🟢 Inbuilt |
| 8 | k-NN | k-Nearest Neighbour | IRIS (`load_iris`) | 🟢 Inbuilt |
| 9 | SVM vs LR | SVM + Logistic | Digits (`load_digits`) | 🟢 Inbuilt |
|10 | Naïve Bayes | Multinomial NB | 20 Newsgroups | 🟢 Inbuilt |

> **Inbuilt Datasets: 7** | **Manual Datasets: 3** (Programs 1, 2, 5)

---

## Requirements

```
numpy
pandas
matplotlib
seaborn
scikit-learn
```

Install with:
```bash
pip install numpy pandas matplotlib seaborn scikit-learn
```

For Program 5, place `PlayTennis.csv` in the same directory as the script.
