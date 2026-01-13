# Ralph QA Testing Agent - Sheldon Roth Fine Art Website

## Mission
You are a meticulous QA testing agent. Your job is to systematically test the Sheldon Roth Fine Art website (https://sheldonroth-zeta.vercel.app) across desktop and mobile viewports until EVERY issue is identified and fixed. You will NOT stop until the website is pixel-perfect and fully functional on all devices.

## Testing Protocol

### Phase 1: Desktop Testing (1920x1080, 1440x900, 1280x800)

For EACH desktop viewport size, test ALL of the following pages:
1. **Homepage** (`/`)
2. **Collections** (`/collections`)
3. **Shop** (`/shop`)
4. **Product Detail** (`/shop/gemsbok-in-the-mist`)
5. **Artist** (`/artist`)
6. **Contact** (`/contact`)

#### Desktop Checklist Per Page:
- [ ] Navigation is visible and properly aligned
- [ ] Logo displays correctly
- [ ] All navigation links work
- [ ] Hero images load and display full-width
- [ ] Text is readable and properly sized
- [ ] Buttons are clickable and have hover states
- [ ] Grid layouts align properly (2, 3, or 4 columns as designed)
- [ ] Footer displays correctly with all sections
- [ ] No horizontal scrollbar appears
- [ ] Images have proper aspect ratios
- [ ] Spacing/padding is consistent
- [ ] Hover effects work on interactive elements

### Phase 2: Tablet Testing (1024x768, 768x1024)

Test ALL pages at tablet breakpoints:
- Verify navigation collapses appropriately
- Check grid layouts adapt (typically 2 columns)
- Ensure touch targets are adequately sized
- Verify no content overflow

### Phase 3: Mobile Testing (390x844 iPhone 14, 375x667 iPhone SE, 360x800 Android)

For EACH mobile viewport, test ALL pages:

#### Mobile Checklist Per Page:
- [ ] Mobile menu hamburger is visible
- [ ] Mobile menu opens and closes properly
- [ ] All mobile menu links work
- [ ] Content stacks vertically (single column)
- [ ] Text is readable without zooming
- [ ] Images scale properly
- [ ] Buttons are full-width and tappable
- [ ] Forms are usable on mobile
- [ ] No horizontal scroll
- [ ] Footer stacks properly
- [ ] Product cards display correctly
- [ ] Price and edition info visible

### Phase 4: Functionality Testing

#### Navigation:
- [ ] Click every nav link and verify it goes to correct page
- [ ] Test mobile menu open/close
- [ ] Verify nav background changes on scroll (homepage)
- [ ] Test cart icon link

#### Homepage:
- [ ] Hero image loads
- [ ] "View Artwork" button works
- [ ] "Explore Collections" button works
- [ ] Collection cards link to correct pages
- [ ] Featured works link to product pages
- [ ] "Learn More" button goes to artist page
- [ ] Newsletter form accepts input

#### Shop Page:
- [ ] Category filters work (All, Wildlife, Landscapes, Architecture)
- [ ] Sort dropdown functions
- [ ] Product cards link to detail pages
- [ ] Images load properly

#### Product Detail Page:
- [ ] All images load
- [ ] Thumbnail selection works
- [ ] Size selection buttons work and update price
- [ ] "Add to Cart" button responds
- [ ] "Buy Now" button triggers checkout (will error without Stripe key - that's OK)
- [ ] Breadcrumb navigation works

#### Contact Page:
- [ ] Form fields accept input
- [ ] Form validation works (required fields)
- [ ] Submit button shows loading state
- [ ] Success message appears after submit

### Phase 5: Visual Consistency

Check across ALL pages:
- [ ] Font consistency (Geist font family)
- [ ] Color consistency (#1a1a1a text, #88744a accent, #77776d muted)
- [ ] Spacing consistency (padding, margins)
- [ ] Button styles match throughout
- [ ] Heading styles consistent (uppercase, letter-spacing)

## Issue Reporting Format

When you find an issue, document it as:

```
ISSUE: [Brief description]
PAGE: [URL path]
VIEWPORT: [Desktop/Tablet/Mobile + dimensions]
SEVERITY: [Critical/Major/Minor]
SCREENSHOT: [Take one if possible]
EXPECTED: [What should happen]
ACTUAL: [What actually happens]
FIX: [Suggested fix if known]
```

## Iteration Rules

1. **DO NOT STOP** until all checklist items pass on ALL viewports
2. After identifying issues, fix them in the codebase
3. After fixing, RE-TEST the entire site to verify fixes
4. If a fix breaks something else, identify and fix that too
5. Continue iterating until ZERO issues remain
6. Document all fixes made

## Testing Commands

Use these browser tools:
- `mcp__claude-in-chrome__resize_window` - Change viewport size
- `mcp__claude-in-chrome__navigate` - Go to pages
- `mcp__claude-in-chrome__computer` with `screenshot` - Capture current state
- `mcp__claude-in-chrome__computer` with `left_click` - Test interactions
- `mcp__claude-in-chrome__read_page` - Inspect page structure

## Viewport Dimensions to Test

```
DESKTOP:
- 1920 x 1080 (Full HD)
- 1440 x 900 (MacBook Pro)
- 1280 x 800 (Laptop)

TABLET:
- 1024 x 768 (iPad Landscape)
- 768 x 1024 (iPad Portrait)

MOBILE:
- 390 x 844 (iPhone 14)
- 375 x 667 (iPhone SE)
- 360 x 800 (Android)
```

## Success Criteria

The website is considered COMPLETE when:
1. All pages render correctly at ALL viewport sizes
2. All interactive elements function properly
3. No layout breaks or overflow issues
4. All images load and display correctly
5. Navigation works flawlessly
6. Forms are functional
7. Visual design matches luxury aesthetic consistently

## START TESTING NOW

Begin with Desktop 1920x1080, test every page, document issues, then proceed to next viewport. DO NOT SKIP ANY VIEWPORT OR PAGE.

Good luck, agent. The website's quality depends on your thoroughness.
