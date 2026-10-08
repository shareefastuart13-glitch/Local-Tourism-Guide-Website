# Local Tourism Guide

A responsive, accessible static website that helps visitors plan a trip to a local area. It presents attractions, accommodation options, practical travel tips and a contact form.

The site is built with **HTML5, CSS3 and vanilla JavaScript only**. There are no frameworks, build tools, package managers, databases or server-side code, so it runs directly on **GitHub Pages**.

## Pages

| File | Page | Highlights |
| --- | --- | --- |
| `index.html` | Home | Hero banner, Why Visit, Featured Attractions, Plan Your Stay, Travel Smart, call to action |
| `attractions.html` | Attractions | Ten attraction cards with a working category filter (Nature, Culture, Heritage, Food, Recreation) |
| `accommodation.html` | Accommodation | Hotel, guesthouse, eco-lodge and budget stay cards with facilities and enquiry buttons |
| `travel-tips.html` | Travel Tips | Six advice topics in a two-column layout, "On this page" links and a Before You Travel checklist |
| `contact.html` | Contact | Contact details and a form with JavaScript validation |

## Folder structure

```
local-tourism-guide/
├── index.html
├── attractions.html
├── accommodation.html
├── travel-tips.html
├── contact.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
        ├── hero-landscape.jpg
        ├── banner-attractions.jpg
        ├── banner-accommodation.jpg
        ├── banner-travel-tips.jpg
        ├── banner-contact.jpg
        ├── attraction-waterfall-trail.jpg
        ├── attraction-botanical-gardens.jpg
        ├── attraction-culture-museum.jpg
        ├── attraction-arts-centre.jpg
        ├── attraction-old-town.jpg
        ├── attraction-harbour-fort.jpg
        ├── attraction-central-market.jpg
        ├── attraction-food-street.jpg
        ├── attraction-river-kayaking.jpg
        ├── attraction-sandy-bay-beach.jpg
        ├── stay-hotel.jpg
        ├── stay-guesthouse.jpg
        ├── stay-eco-lodge.jpg
        └── stay-budget.jpg
```

## Features

- Same header, navigation and footer on every page, with an active-page style
- Mobile menu button that opens and closes with JavaScript (also closes with the Escape key)
- Attraction filter that shows and hides cards by category and announces the result to screen readers
- Contact form validation: all fields required, email format check, error messages beside each field and a success message
- Smooth scrolling for links within a page
- Responsive layouts tested at 320px, 768px and 1200px wide
- Accessibility: skip link, semantic HTML, one `h1` per page, logical headings, alt text, visible focus styles, `aria` states on the menu and filter buttons, and reduced-motion support

## Customising the website

### Replace the images

The images in `assets/images/` are illustrated placeholders. To use your own photos, save a new image **with exactly the same file name** (for example `attraction-old-town.jpg`) and it will appear automatically. Landscape photos around 1200 × 800 pixels work best for cards and around 1920 × 720 pixels for page banners.

If you change an image, also update its `alt` text in the HTML so it describes the new picture.

### Change colours, spacing and fonts

Open `css/style.css`. All main colours, spacing, corner radius and shadows are stored as CSS custom properties at the top of the file inside `:root`. Change a value there and it updates across the whole website.

### Change the contact details

Open `contact.html` and edit the email address, telephone number, opening hours and location. The example email uses the reserved `.example` domain and the telephone number uses the fictional 555-01xx range, so replace both before publishing.

### About the contact form

GitHub Pages only hosts static files, so the form does **not** send messages. JavaScript checks the fields and shows a success message. To receive real messages later, you could connect the form to a third-party form service.

## Run it on your computer

No installation is needed. Download or clone the folder and double-click `index.html` to open it in your web browser.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload all website files while keeping the folder structure unchanged (`index.html` must be at the top level of the repository).
3. Open the repository **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` branch and the `/ (root)` folder.
7. Select **Save**, wait a minute or two, then open the published website link shown at the top of the Pages screen.

Your site address will look like `https://your-username.github.io/your-repository-name/`.

## Disclaimer

This website provides general visitor information only. It is not an official tourism authority and does not provide live booking, pricing or availability information. Visitors should confirm all details directly with providers.
