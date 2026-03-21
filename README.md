# Physiotherapy Website

A fully responsive, pixel-perfect physiotherapy website built with HTML, CSS, and JavaScript.

## Project Structure

```
/Users/syed/personal/peaq/
├── index.html              # Homepage
├── about.html              # About Us page
├── services.html           # Services page
├── css/
│   ├── main.css           # Core styles, typography, colors
│   ├── components.css     # Reusable components (cards, buttons, sections)
│   ├── layout.css         # Layout and grid systems
│   ├── animations.css     # All animations and transitions
│   └── responsive.css     # Media queries for all breakpoints
├── js/
│   ├── main.js           # Main JavaScript logic
│   ├── carousel.js       # Testimonial carousel functionality
│   ├── counter.js        # Counter animations
│   ├── accordion.js      # FAQ accordion
│   └── navigation.js     # Mobile menu and smooth scroll
└── assets/
    └── images/           # Image directory (needs your images)
```

## Features Implemented

### ✅ Pages
- **Homepage** - Complete with all sections (hero, stats, team, services, testimonials, partners)
- **About Page** - Hero, content sections, video section, team, stats, testimonials
- **Services Page** - Hero, detailed services grid, stats, FAQ accordion, partners

### ✅ Components
- Sticky navigation header with mobile menu
- Animated counters (0+ increment on scroll)
- Testimonial carousel with auto-play and manual controls
- FAQ accordion with smooth expand/collapse
- Service cards with hover effects
- Team member cards
- Partner logo grid
- Footer with newsletter signup

### ✅ Functionality
- Mobile-responsive design (320px - 1920px+)
- Smooth scroll navigation
- Intersection Observer for scroll animations
- Touch/swipe support for carousel
- Keyboard accessibility
- Auto-playing testimonial carousel with pause on hover

## Getting Started

### 1. Open the Website

Simply open any of the HTML files in your web browser:
- `index.html` - Homepage
- `about.html` - About page
- `services.html` - Services page

### 2. Replace Placeholder Images

The website currently uses placeholder images from picsum.photos. Replace these with your actual images:

**Required Images:**
- **Hero backgrounds** (for all 3 pages):
  - `assets/images/hero-bg.jpg` (1920x800px recommended)

- **Team photos** (6 photos):
  - `assets/images/team-1.jpg` through `team-6.jpg` (600x700px recommended)

- **Service images** (8 images):
  - `assets/images/service-1.jpg` through `service-8.jpg` (400x300px recommended)

- **About page images** (3 images):
  - `assets/images/about-1.jpg` (800x1000px recommended)
  - `assets/images/about-2.jpg` (800x400px recommended)

- **Partner logos** (6 logos):
  - Replace the placeholder text in the partner logo sections with actual logo images

### 3. Customize Content

All content is placeholder text. Update the following in each HTML file:

- **Text content** - Replace all placeholder text with your actual content
- **Names and titles** - Update team member names and specialties
- **Service descriptions** - Add your actual service descriptions
- **Testimonials** - Replace with real patient testimonials
- **Contact information** - Add your actual contact details in the footer

### 4. Update Colors (Optional)

If you want to change the color scheme, edit the CSS variables in `css/main.css`:

```css
:root {
    --primary-teal: rgb(8, 118, 105);
    --dark-teal: rgb(6, 84, 75);
    --light-teal-bg: rgb(230, 241, 240);
    /* etc. */
}
```

### 5. Configure Video Embed

In `about.html`, replace the YouTube video placeholder:

```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"></iframe>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- Screen reader friendly

## Responsive Breakpoints

- **Mobile Small**: 320px - 375px
- **Mobile Large**: 376px - 425px
- **Tablet Portrait**: 426px - 768px
- **Tablet Landscape**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Desktop**: 1441px+

## JavaScript Features

### Counter Animation
Counters animate from 0 to their target value when scrolled into view using the Intersection Observer API.

### Testimonial Carousel
- Auto-plays every 5 seconds
- Pauses on hover
- Manual navigation with prev/next buttons
- Dot indicators for direct navigation
- Touch/swipe support on mobile
- Responsive (shows 1, 2, or 3 slides based on screen size)

### FAQ Accordion
- Smooth expand/collapse animations
- One item open at a time (configurable)
- Keyboard accessible
- ARIA compliant

### Mobile Menu
- Hamburger menu on mobile devices
- Full-screen overlay
- Closes on link click or escape key
- Prevents body scroll when open

## Development Notes

### To Add More Services
1. Copy a `.service-card` block in the HTML
2. Update the image path, title, and description
3. The grid will automatically adjust

### To Add More Team Members
1. Copy a `.team-card` block in the HTML
2. Update the image, name, and specialty
3. The grid will automatically adjust (3 columns on desktop, 2 on tablet, 1 on mobile)

### To Add More FAQ Items
1. Copy a `.faq-item` block in `services.html`
2. Update the question and answer
3. The accordion will automatically initialize

## Next Steps

1. ✅ Replace all placeholder images with your actual photos
2. ✅ Update all text content with your real information
3. ✅ Test on multiple devices and browsers
4. ✅ Add your actual YouTube video
5. ✅ Configure partner logos
6. ✅ Set up contact form backend (currently just shows success message)
7. ✅ Add any additional pages you need
8. ✅ Deploy to a web hosting service

## License

This is a custom-built website. All rights reserved.

## Support

For any questions or issues, please refer to the code comments or the original plan document.
# peaq
