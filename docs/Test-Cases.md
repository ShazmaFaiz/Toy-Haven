# Toy Haven — Test Cases

Use this document as the testing evidence sheet. Record the actual date, browser/device and result after running each test. Do not claim an external validator result until you have run it.

| ID | Area | Test | Expected result | Result / evidence |
|---|---|---|---|---|
| TC01 | Home | Open Home page | Page loads with navigation, hero, featured collection and footer | |
| TC02 | Home | Wait through hero slides | Promotional banners rotate automatically | |
| TC03 | Home | Submit valid newsletter email | Success message appears and email is saved in localStorage | |
| TC04 | Products | Search for “Robot” | Matching product is displayed and result count updates | |
| TC05 | Products | Select each category filter | Only products in selected category are shown | |
| TC06 | Products | Click View on a product | Accessible modal opens with image, description and price | |
| TC07 | Products | Add product to cart | Cart count updates and item persists after page refresh | |
| TC08 | Products | Add/remove wishlist item | Heart state changes and wishlist data is saved | |
| TC09 | Cart | Increase/decrease quantity | Quantity, subtotal and total update dynamically | |
| TC10 | Cart | Clear cart | Cart becomes empty and checkout is disabled | |
| TC11 | Checkout | Submit incomplete form | Validation prevents submission and error message is shown | |
| TC12 | Checkout | Complete Cash on Delivery checkout | Success message appears, cart clears and order history is saved | |
| TC13 | Checkout | Select Card | Card fields become required | |
| TC14 | Wishlist | Change status | Interested / Owned / Not Interested persists after refresh | |
| TC15 | Feedback | Submit invalid feedback | Validation prevents submission | |
| TC16 | Feedback | Submit valid feedback | Confirmation appears and feedback is saved in localStorage | |
| TC17 | Feedback | Open/close FAQ questions | Accordion expands and collapses with JavaScript | |
| TC18 | Responsive | Test 375px, 768px, 1024px+ widths | Layout remains usable; mobile nav becomes hamburger | |
| TC19 | Accessibility | Run WAVE | Fix reported issues; record final result/screenshot | |
| TC20 | HTML | Run W3C Markup Validation | No errors; record validator URL/result | |
| TC21 | CSS | Run W3C CSS Validation | No errors; record validator URL/result | |
| TC22 | Lighthouse | Desktop audit | Record Performance, Accessibility, Best Practices and SEO | |
| TC23 | Lighthouse | Mobile audit | Record Performance, Accessibility, Best Practices and SEO | |
| TC24 | PWA | Run through HTTPS/localhost | Manifest/service worker load; installability can be checked | |

## External testing URLs
- W3C HTML Validator: https://validator.w3.org/
- W3C CSS Validator: https://jigsaw.w3.org/css-validator/
- WAVE: https://wave.webaim.org/
- Lighthouse: Chrome DevTools → Lighthouse

## Responsiveness matrix
- Mobile: 375 × 667
- Tablet: 768 × 1024
- Laptop/Desktop: 1366 × 768
- Large desktop: 1920 × 1080
