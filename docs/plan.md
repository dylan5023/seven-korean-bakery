# Plan

Phase 1 is frontend-only. See [product-spec.md](product-spec.md) for feature details and [architecture.md](architecture.md) for how the code is organized.

## Phase 1 epics

1. **Project Setup** – Next.js scaffold, tooling, project documentation.
2. **Global Layout** – header, navigation, English / 한국어 toggle, footer.
3. **Home** – hero, introduction, ordering steps, occasions, today's store hours, gallery placeholders.
4. **Products** – Find Our Products page: our store, store hours, other retail locations.
5. **Custom Order** – order / inquiry request form. **Partially blocked.**
   - Ready: request type dropdown, customer details (KakaoTalk ID shown only when KakaoTalk is selected), order category dropdown, everyday menu selection with quantity.
   - Blocked: Special Occasion details, collection options, and submission handling (the spec text was cut off).
   - Also blocked: choosing a form submission service (see open decisions).
6. **Gallery** – blocked: no requirements or photos yet.

## Open decisions

- **Hosting** – not decided.
- **Form submission service** – not decided. Needed for the Custom Order form without a backend.
- **Domain and existing site** – what happens to the current `7koreanbakery.ca` site, and which domain the new site uses.
- **Default language** – currently Korean (`defaultLocale` in `src/lib/locales.ts`). To be confirmed.

## Phase 2 / Later

- HubSpot
- n8n
- Analytics

No details yet.
