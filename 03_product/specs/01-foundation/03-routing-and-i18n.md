# Spec 03: Routing and i18n

## Goal

Establish a robust multi-language routing system with RTL support.

## Strategy

- **Base Paths**: `/ar/` and `/en/`.
- **Default Locale**: `ar`.
- **Middleware**: Detect language and redirect to `ar` by default.
- **RTL**: Automatic direction switching based on locale.

## Acceptance Criteria

- `/ar/about` shows Arabic content with RTL layout.
- `/en/about` shows English content with LTR layout.
- Language switcher in Navbar works.

---
Prepared under the direction of Mamdouh Aboammar, Digital Director at "$BrandNameArabic$"  
LinkedIn: <https://www.linkedin.com/in/mamdouh-aboammar>
