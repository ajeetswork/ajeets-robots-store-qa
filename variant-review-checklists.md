# Variant Review Checklists

Source: Notion – "Ajeet's Robots Variant Review Lab" database `3b9c1db3-c3be-81b1-8fc5-f73c6d67b1f2`
Date exported: 2026-08-23

Companion to `customer-complaints-resolution-guide.md` – these are proactive QA checklists to prevent complaints, not post-mortem resolution steps.

---

## 1. Ajeets Robots - Wireless Earbuds

- **Printify ID:** 6a5d76570e7b07617a09f3cf
- **Price:** $41.99
- **Link:** https://ajeets.printify.me/product/30184150
- **Review Burden:** Low
- **Customer-Confusion Risk:** Low
- **Variant Structure:** Color (White) × Size (One size) = 1 variant

### Pre-Change Checklist
1. Confirm print area template still fits "Ajeets Robots" text – check for truncation bug (known issue: case printed "Ajeets Rob").
2. Verify White / One size SKU is the only variant – no other colors/sizes exist to accidentally enable.

### Most Error-Prone Check
Print text truncation on earbud case.

---

## 2. Ajeets Robot - Sweatshirt Blanket

- **Review Burden:** Low
- **Variant Dimensions:** Size: 60" × 50", 80" × 60" (2) = 2 variants

### Pre-Change Checklist
1. Verify 60" × 50" is enabled and matches listing photos.
2. Check 80" × 60" disabled variant stays disabled after product sync.

### Most Error-Prone Check
Wrong size enabled — verify 60"×50" not 80"×60" after sync.

---

## 3. Ajeets Robots - Men's Soft Shell Jacket

- **Printify ID:** 6a5167f5667e100da0023814
- **Price:** $77.65 – $88.60
- **Review Burden:** High
- **Customer-Confusion Risk:** High
- **Variant Dimensions:** Color (6) × Size (9) = 54 variants

### Pre-Change Checklist
1. Confirm all 54 color/size combinations enabled with correct pricing tiers.
2. Verify size chart matches Printify provider.
3. Check color names match actual garment colors (Black/Navy/Charcoal/Royal/Red/Forest).
4. Confirm XS–5XL size range renders correctly on Wix product page.

### Most Error-Prone Check
Color confusion – Navy vs Royal vs Charcoal look similar in mockups.

---

## 4. Ajeet Robot mens tee

- **Printify ID:** 6a51683a667e100da0023852
- **Price:** $23.02 – $30.22
- **Visible:** No (hidden in Printify storefront)
- **Review Burden:** High
- **Customer-Confusion Risk:** Medium
- **Variant Dimensions:** Color (19) × Size (10) = 190 variants

### Pre-Change Checklist
1. Audit all 190 color/size combinations.
2. Product description contains only care instructions, no marketing copy (flagged in ajeets-robots-catalog/current-catalog-baseline.md).
3. Title case inconsistent ("Ajeet Robot mens tee" – missing possessive s, lowercase "mens").
4. Verify pricing tiers across all 19 colors.

### Most Error-Prone Check
Color confusion with 19 color options.

---

## 5. Ajeets Robots - Kids Cotton Tee

- **Printify ID:** 6a51687e667e100da0023895
- **Price:** $14.99 – $22.99
- **Review Burden:** High
- **Customer-Confusion Risk:** High
- **Variant Dimensions:** Color (12) × Size (11) = 132 variants

### Most Error-Prone Check
Color confusion – 12 colors with similar names. Kids sizing varies by brand.

---

**Notion source:** https://www.notion.so/3b9c1db3c3be81b18fc5f73c6d67b1f2
