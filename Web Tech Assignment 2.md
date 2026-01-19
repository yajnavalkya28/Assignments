# Dublin Website - Complete Code

## Project Structure

```
dublin-website/
|
|-- index.html
|-- places.html
|-- food.html
|-- parks.html
|-- nightlife.html
|
|-- index.css
|-- places.css
|-- food.css
|-- parks.css
|-- nightlife.css
|
|-- script.js
|
|-- images/
    |-- img1.jpg
    |-- img2.jpg
    |-- img3.jpg
    |-- img4.jpg
    |-- img5.jpg
    |-- img6.jpg
    |-- img7.jpg
    |-- img8.jpg
    |-- img9.jpg
    |-- img10.jpg
```

---

## HTML Files

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dublin Guide</title>
    <link rel="stylesheet" href="index.css">
    <script src="script.js" defer></script>
</head>
<body>

<h1>Welcome to Dublin City Guide</h1>

<nav>
    <a href="places.html">Places</a> |
    <a href="food.html">Food</a> |
    <a href="parks.html">Parks</a> |
    <a href="nightlife.html">Nightlife</a>
</nav>

<hr>

<h2>Fare Checker</h2>
<label>Name:</label>
<input type="text" id="userName">

<label>Age:</label>
<input type="number" id="age">

<button onclick="checkFare()">Check Fare</button>
<p id="fareResult"></p>

<hr>

<h2>Food Preference</h2>
<label>Name:</label>
<input type="text" id="foodName">

<label>Favourite Cuisine:</label>
<input type="text" id="cuisine">

<button onclick="showFood()">Submit</button>

<textarea id="foodOutput" rows="4" cols="40"></textarea>

<hr>

<h2>Dublin Introduction Video</h2>
<video controls width="400">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

<h2>Traditional Irish Music</h2>
<audio controls>
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
</audio>

</body>
</html>
```

### places.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dublin Places</title>
    <link rel="stylesheet" href="places.css">
</head>
<body>

<h1>Famous Places in Dublin</h1>

<ul>
    <li>Trinity College</li>
    <li>Dublin Castle</li>
    <li>Temple Bar</li>
</ul>

<img src="images/img1.jpg" width="300">
<img src="images/img2.jpg" width="300">

<table border="1">
<tr>
    <th>Place</th>
    <th>Entry Fee</th>
</tr>
<tr>
    <td>Trinity College</td>
    <td>€15</td>
</tr>
<tr>
    <td>Dublin Castle</td>
    <td>€8</td>
</tr>
</table>

<br>
<a href="index.html">Back to Home</a>

</body>
</html>
```

### food.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dublin Food</title>
    <link rel="stylesheet" href="food.css">
</head>
<body>

<h1>Best Food Places</h1>

<ol>
    <li>Irish Pub Food</li>
    <li>Seafood</li>
    <li>Street Food</li>
</ol>

<img src="images/img3.jpg" width="300">
<img src="images/img4.jpg" width="300">

<p>
Visit 
<a href="https://www.tripadvisor.com" target="_blank">TripAdvisor</a>
for food reviews.
</p>

<a href="index.html">Back to Home</a>

</body>
</html>
```

### parks.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dublin Parks</title>
    <link rel="stylesheet" href="parks.css">
</head>
<body>

<h1>Beautiful Parks in Dublin</h1>

<ul>
    <li>Phoenix Park</li>
    <li>St Stephen's Green</li>
</ul>

<img src="images/img5.jpg" width="300">
<img src="images/img6.jpg" width="300">

<embed src="https://www.wikipedia.org" width="400" height="300">

<br>
<a href="index.html">Back to Home</a>

</body>
</html>
```

### nightlife.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dublin Nightlife</title>
    <link rel="stylesheet" href="nightlife.css">
</head>
<body>

<h1>Dublin Nightlife</h1>

<p>Enjoy live music, pubs and night events in Dublin.</p>

<img src="images/img7.jpg" width="250">
<img src="images/img8.jpg" width="250">
<img src="images/img9.jpg" width="250">
<img src="images/img10.jpg" width="250">

<br>
<a href="index.html">Back to Home</a>

</body>
</html>
```

---

## CSS Files

### index.css

```css
body {
    font-family: Arial;
    background-color: #f2f2f2;
}

h1 {
    color: green;
}

nav a {
    margin: 10px;
    text-decoration: none;
    color: blue;
}

input, button {
    margin: 5px;
}

video, audio {
    margin-top: 10px;
}
```

### places.css

```css
body {
    background-color: #fffbe6;
}

h1 {
    color: brown;
}

img {
    margin: 10px;
    border-radius: 10px;
}

table {
    margin-top: 10px;
}
```

### food.css

```css
body {
    background-color: #e6f7ff;
}

h1 {
    color: darkblue;
}

img {
    padding: 5px;
}

p {
    font-size: 16px;
}
```

### parks.css

```css
body {
    background-color: #e6ffe6;
}

h1 {
    color: darkgreen;
}

ul {
    list-style-type: square;
}

embed {
    margin-top: 10px;
}
```

### nightlife.css

```css
body {
    background-color: #1a1a1a;
    color: white;
}

h1 {
    color: orange;
}

img {
    margin: 5px;
}

p {
    font-size: 18px;
}
```

---

## JavaScript File

### script.js

```javascript
function checkFare() {
    let age = document.getElementById("age").value;
    let result = document.getElementById("fareResult");

    if (age <= 19) {
        result.innerText = "You can pay child's fare";
    } else {
        result.innerText = "You must pay the adult fare";
    }
}

function showFood() {
    let name = document.getElementById("foodName").value;
    let cuisine = document.getElementById("cuisine").value;

    document.getElementById("foodOutput").value =
        "Name: " + name + "\nFavourite Cuisine: " + cuisine;
}
```

---

## Setup Instructions

1. Create a folder named `dublin-website`
2. Create all HTML files in the root of this folder
3. Create all CSS files in the root of this folder
4. Create the `script.js` file in the root of this folder
5. Create an `images` subfolder
6. Add 10 images (img1.jpg through img10.jpg) to the images folder
7. Open `index.html` in a web browser to view the website

## Features

- **Multi-page navigation**: Links between different sections (Places, Food, Parks, Nightlife)
- **Interactive fare checker**: Age-based fare calculation
- **Food preference form**: Captures user input and displays it
- **Multimedia**: Embedded video and audio players
- **Responsive images**: Gallery of Dublin attractions
- **External links**: TripAdvisor integration
- **Data tables**: Entry fee information for attractions
