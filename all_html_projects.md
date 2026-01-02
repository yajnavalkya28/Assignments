# HTML Projects - All 10 Complete Codes

## Project 1: Personal Portfolio Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
    <style>
        body {
            font-family: Arial;
            margin: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: white;
        }
        h2 {
            color: #333;
            border-bottom: 2px solid #333;
        }
        .skills li {
            background: #ddd;
            margin: 5px 0;
            padding: 10px;
        }
    </style>
</head>
<body>
    <header>
        <h1>John Doe</h1>
        <p>Web Developer</p>
    </header>
    
    <div class="container">
        <section>
            <h2>About Me</h2>
            <p>I am a web developer with experience in HTML, CSS, and JavaScript.</p>
        </section>
        
        <section>
            <h2>Skills</h2>
            <ul class="skills">
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
            </ul>
        </section>
        
        <section>
            <h2>Portfolio</h2>
            <div>
                <h3>Project 1</h3>
                <p>E-commerce website</p>
            </div>
        </section>
        
        <section>
            <h2>Contact</h2>
            <p>Email: john@example.com</p>
        </section>
    </div>
</body>
</html>
```

---

## Project 2: Simple Blog Layout

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Blog</title>
    <style>
        body {
            font-family: Georgia;
            margin: 0;
            background: #f5f5f5;
        }
        header {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        main {
            max-width: 800px;
            margin: 30px auto;
            padding: 20px;
        }
        .post {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
        }
        .post h2 {
            color: #2c3e50;
        }
        .post-date {
            color: #777;
            font-size: 14px;
        }
        footer {
            background: #34495e;
            color: white;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <p>Welcome to my thoughts</p>
    </header>
    
    <main>
        <article class="post">
            <h2>First Blog Post</h2>
            <p class="post-date">January 1, 2024</p>
            <p>This is my first blog post. I will share my thoughts and experiences here.</p>
        </article>
        
        <article class="post">
            <h2>Second Blog Post</h2>
            <p class="post-date">January 5, 2024</p>
            <p>Another interesting post about web development and design.</p>
        </article>
    </main>
    
    <footer>
        <p>&copy; 2024 My Blog</p>
    </footer>
</body>
</html>
```

---

## Project 3: Landing Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Product Landing Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: Arial;
        }
        .hero {
            background: linear-gradient(to right, #667eea, #764ba2);
            color: white;
            text-align: center;
            padding: 100px 20px;
        }
        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .btn {
            background: white;
            color: #667eea;
            padding: 15px 30px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            border-radius: 5px;
        }
        .features {
            max-width: 1000px;
            margin: 50px auto;
            display: flex;
            gap: 30px;
            padding: 20px;
        }
        .feature {
            flex: 1;
            text-align: center;
            padding: 20px;
        }
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Amazing Product</h1>
        <p>Transform your life with our innovative solution</p>
        <a href="#" class="btn">Get Started</a>
    </section>
    
    <section class="features">
        <div class="feature">
            <h3>Fast</h3>
            <p>Lightning quick performance</p>
        </div>
        <div class="feature">
            <h3>Secure</h3>
            <p>Your data is safe with us</p>
        </div>
        <div class="feature">
            <h3>Easy</h3>
            <p>Simple and intuitive to use</p>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2024 Amazing Product</p>
    </footer>
</body>
</html>
```

---

## Project 4: eCommerce Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Online Shop</title>
    <style>
        body {
            font-family: Arial;
            margin: 0;
            background: #f8f8f8;
        }
        header {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .products {
            max-width: 1200px;
            margin: 30px auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 20px;
        }
        .product {
            background: white;
            padding: 20px;
            text-align: center;
            border: 1px solid #ddd;
        }
        .product img {
            width: 100%;
            height: 200px;
            background: #ddd;
        }
        .price {
            color: #e74c3c;
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        .btn {
            background: #27ae60;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>Online Shop</h1>
    </header>
    
    <div class="products">
        <div class="product">
            <img src="" alt="Product 1">
            <h3>Product 1</h3>
            <p>High quality product</p>
            <p class="price">$29.99</p>
            <button class="btn">Add to Cart</button>
        </div>
        
        <div class="product">
            <img src="" alt="Product 2">
            <h3>Product 2</h3>
            <p>Best seller item</p>
            <p class="price">$39.99</p>
            <button class="btn">Add to Cart</button>
        </div>
        
        <div class="product">
            <img src="" alt="Product 3">
            <h3>Product 3</h3>
            <p>Premium quality</p>
            <p class="price">$49.99</p>
            <button class="btn">Add to Cart</button>
        </div>
    </div>
</body>
</html>
```

---

## Project 5: Recipe Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Chocolate Cake Recipe</title>
    <style>
        body {
            font-family: Georgia;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fff8e7;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            color: #5d4037;
        }
        .recipe-info {
            background: white;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #ff6f00;
        }
        h2 {
            color: #ff6f00;
            border-bottom: 2px solid #ff6f00;
        }
        .ingredients {
            background: white;
            padding: 20px;
            margin: 20px 0;
        }
        .ingredients li {
            padding: 5px 0;
        }
        .instructions {
            background: white;
            padding: 20px;
        }
        .instructions ol li {
            margin: 10px 0;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <header>
        <h1>Chocolate Cake</h1>
        <p>Delicious homemade chocolate cake</p>
    </header>
    
    <div class="recipe-info">
        <p><strong>Prep Time:</strong> 20 minutes</p>
        <p><strong>Cook Time:</strong> 35 minutes</p>
        <p><strong>Servings:</strong> 8 people</p>
    </div>
    
    <section class="ingredients">
        <h2>Ingredients</h2>
        <ul>
            <li>2 cups all-purpose flour</li>
            <li>2 cups sugar</li>
            <li>3/4 cup cocoa powder</li>
            <li>2 eggs</li>
            <li>1 cup milk</li>
            <li>1/2 cup oil</li>
            <li>1 tsp vanilla extract</li>
        </ul>
    </section>
    
    <section class="instructions">
        <h2>Instructions</h2>
        <ol>
            <li>Preheat oven to 350°F (175°C)</li>
            <li>Mix dry ingredients in a large bowl</li>
            <li>Add eggs, milk, oil, and vanilla</li>
            <li>Beat for 2 minutes until smooth</li>
            <li>Pour into greased pan</li>
            <li>Bake for 30-35 minutes</li>
            <li>Let cool and serve</li>
        </ol>
    </section>
</body>
</html>
```

---

## Project 6: Responsive Navigation Menu

```html
<!DOCTYPE html>
<html>
<head>
    <title>Responsive Menu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: Arial;
        }
        nav {
            background: #333;
            position: relative;
        }
        nav ul {
            list-style: none;
            display: flex;
        }
        nav li {
            position: relative;
        }
        nav a {
            color: white;
            text-decoration: none;
            padding: 20px 30px;
            display: block;
        }
        nav li:hover {
            background: #555;
        }
        nav li:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0;
            background: #e74c3c;
            transition: width 0.3s;
        }
        nav li:nth-child(1):hover:before {
            background: #e74c3c;
            width: 5px;
        }
        nav li:nth-child(2):hover:before {
            background: #3498db;
            width: 5px;
        }
        nav li:nth-child(3):hover:before {
            background: #2ecc71;
            width: 5px;
        }
        nav li:nth-child(4):hover:before {
            background: #f39c12;
            width: 5px;
        }
        nav li:nth-child(5):hover:before {
            background: #9b59b6;
            width: 5px;
        }
        .content {
            padding: 50px;
            text-align: center;
        }
    </style>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
    
    <div class="content">
        <h1>Welcome</h1>
        <p>Hover over the menu items to see the effect</p>
    </div>
</body>
</html>
```

---

## Project 7: Small Business Homepage

```html
<!DOCTYPE html>
<html>
<head>
    <title>Small Business</title>
    <style>
        body {
            font-family: Arial;
            margin: 0;
        }
        header {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        .services {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 40px 0;
        }
        .service {
            background: #ecf0f1;
            padding: 30px;
            text-align: center;
        }
        .info {
            background: #3498db;
            color: white;
            padding: 40px;
            text-align: center;
            margin-top: 40px;
        }
        footer {
            background: #34495e;
            color: white;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>ABC Services</h1>
        <p>Your trusted business partner</p>
    </header>
    
    <div class="container">
        <h2>Our Services</h2>
        <div class="services">
            <div class="service">
                <h3>Consulting</h3>
                <p>Expert business advice</p>
            </div>
            <div class="service">
                <h3>Development</h3>
                <p>Custom solutions</p>
            </div>
            <div class="service">
                <h3>Support</h3>
                <p>24/7 customer care</p>
            </div>
        </div>
    </div>
    
    <div class="info">
        <h2>Contact Us</h2>
        <p>Hours: Mon-Fri 9AM-5PM</p>
        <p>Phone: (555) 123-4567</p>
        <p>Address: 123 Main St, City</p>
    </div>
    
    <footer>
        <p>&copy; 2024 ABC Services</p>
    </footer>
</body>
</html>
```

---

## Project 8: Survey Form

```html
<!DOCTYPE html>
<html>
<head>
    <title>Survey Form</title>
    <style>
        body {
            font-family: Arial;
            background: #f4f4f4;
            padding: 20px;
        }
        .form-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 5px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        label {
            display: block;
            margin: 15px 0 5px;
            font-weight: bold;
        }
        input[type="text"],
        input[type="email"],
        select,
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
        }
        .radio-group,
        .checkbox-group {
            margin: 10px 0;
        }
        input[type="submit"] {
            background: #3498db;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Customer Survey</h1>
        <form>
            <label>Name:</label>
            <input type="text" name="name" required>
            
            <label>Email:</label>
            <input type="email" name="email" required>
            
            <label>Age Group:</label>
            <select name="age">
                <option>18-25</option>
                <option>26-35</option>
                <option>36-50</option>
                <option>50+</option>
            </select>
            
            <label>How satisfied are you?</label>
            <div class="radio-group">
                <input type="radio" name="satisfaction" value="very"> Very Satisfied<br>
                <input type="radio" name="satisfaction" value="satisfied"> Satisfied<br>
                <input type="radio" name="satisfaction" value="neutral"> Neutral<br>
                <input type="radio" name="satisfaction" value="unsatisfied"> Unsatisfied
            </div>
            
            <label>Which features do you use?</label>
            <div class="checkbox-group">
                <input type="checkbox" name="features" value="feature1"> Feature 1<br>
                <input type="checkbox" name="features" value="feature2"> Feature 2<br>
                <input type="checkbox" name="features" value="feature3"> Feature 3
            </div>
            
            <label>Comments:</label>
            <textarea rows="5" name="comments"></textarea>
            
            <input type="submit" value="Submit Survey">
        </form>
    </div>
</body>
</html>
```

---

## Project 9: Event Invitation Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Invitation</title>
    <style>
        body {
            font-family: Arial;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .invitation {
            background: white;
            max-width: 600px;
            padding: 50px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #667eea;
            font-size: 36px;
            margin-bottom: 20px;
        }
        .event-details {
            margin: 30px 0;
            line-height: 2;
        }
        .detail {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #667eea;
        }
        .rsvp {
            background: #667eea;
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="invitation">
        <h1>You're Invited!</h1>
        <p>Join us for a special celebration</p>
        
        <div class="event-details">
            <div class="detail">
                <strong>Event:</strong> Annual Gala
            </div>
            <div class="detail">
                <strong>Date:</strong> January 15, 2024
            </div>
            <div class="detail">
                <strong>Time:</strong> 7:00 PM
            </div>
            <div class="detail">
                <strong>Venue:</strong> Grand Hall, 123 Main Street
            </div>
        </div>
        
        <p>Dress Code: Formal</p>
        <button class="rsvp">RSVP Now</button>
    </div>
</body>
</html>
```

---

## Project 10: Parallax Website

```html
<!DOCTYPE html>
<html>
<head>
    <title>Parallax Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: Arial;
        }
        .parallax {
            background-image: url('https://via.placeholder.com/1920x1080/667eea/ffffff?text=Section+1');
            height: 100vh;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .parallax h1 {
            color: white;
            font-size: 48px;
            text-align: center;
            background: rgba(0,0,0,0.5);
            padding: 30px;
        }
        .content {
            background: white;
            padding: 80px 20px;
            text-align: center;
        }
        .content h2 {
            font-size: 36px;
            margin-bottom: 20px;
        }
        .content p {
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.8;
            font-size: 18px;
        }
        .parallax2 {
            background-image: url('https://via.placeholder.com/1920x1080/764ba2/ffffff?text=Section+2');
            height: 100vh;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    <div class="parallax">
        <h1>Welcome to Parallax</h1>
    </div>
    
    <div class="content">
        <h2>About Us</h2>
        <p>This is a parallax scrolling website. As you scroll down, you'll notice the background images stay fixed while the content moves. This creates a beautiful 3D effect that adds depth to your website.</p>
    </div>
    
    <div class="parallax2">
        <h1>Our Services</h1>
    </div>
    
    <div class="content">
        <h2>What We Do</h2>
        <p>We provide excellent web design and development services. Our team creates stunning websites with modern effects like this parallax scrolling feature.</p>
    </div>
</body>
</html>
```

---

## Notes for Writing by Hand

1. **Start with basic HTML structure**: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
2. **Keep CSS inside `<style>` tags** in the head section
3. **Use simple selectors**: element names, classes (.), IDs (#)
4. **Common CSS properties to remember**:
   - Layout: margin, padding, display, width, max-width
   - Colors: background, color
   - Text: font-family, font-size, text-align
   - Spacing: line-height
   - Borders: border, border-bottom

5. **Test each project** in a browser after writing to check for typos

Each project is self-contained and can be written as a single HTML file. Good luck with your assignment!