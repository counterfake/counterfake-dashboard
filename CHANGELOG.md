# [0.2.0-beta.2](https://github.com/counterfake/counterfake-dashboard/compare/v0.2.0-beta.1...v0.2.0-beta.2) (2025-08-31)


### Bug Fixes

* fix build & type errros ([c5542e0](https://github.com/counterfake/counterfake-dashboard/commit/c5542e07d52e7df1bcaccf0e34a79c11ee034141))

# [0.2.0-beta.1](https://github.com/counterfake/counterfake-dashboard/compare/v0.1.1...v0.2.0-beta.1) (2025-08-31)


* feat(notifications)!: add internal email infra and beta feedback feature; replace dashboard layout ([0a23511](https://github.com/counterfake/counterfake-dashboard/commit/0a2351126855ab26e500ca26bf34bb4b07ffb563))
* feat(user-dashboard)!: remove language change button from the user dashboard sidebar footer ([f2d77db](https://github.com/counterfake/counterfake-dashboard/commit/f2d77dbdb2547f61d7f416d6063c9136038f391c))
* refactor(authentication)!: remove unnecassery files & pages ([1381ab9](https://github.com/counterfake/counterfake-dashboard/commit/1381ab9ba57a2f41a03423033949c91263ae14a7))


### Bug Fixes

* **products:** fix product list logic hooks ([af4a9e5](https://github.com/counterfake/counterfake-dashboard/commit/af4a9e5daee8c02ce250dbb5b12772cd7118deb3))
* **ui:** fix overflow issue for products & dashboard pages ([85536e3](https://github.com/counterfake/counterfake-dashboard/commit/85536e3339738650d2a38d47abfccd78f28dcddb))


### Code Refactoring

* **chat:** migrate chat module to feature-based structure and add types ([d2f93af](https://github.com/counterfake/counterfake-dashboard/commit/d2f93af493e05a6f104f496ce3c9e8804d287f31))
* move analytics components to a separate feature folder and reorganize the dashboard page ([88ee034](https://github.com/counterfake/counterfake-dashboard/commit/88ee0340d39c1c8de1a691ad925afc0666265de4))
* **products:** restructure product detail & list features ([53b3886](https://github.com/counterfake/counterfake-dashboard/commit/53b3886014978d0e854bae8ad9b210fc9053c84a))


### Features

* **authentication:** add coming soon button for google & facebook sign in buttons, forgot password and sign up links ([4a568fe](https://github.com/counterfake/counterfake-dashboard/commit/4a568fe851d4e35457d122db1d17c73e487d7afa))


### BREAKING CHANGES

* `/features/authentication/components/user-auth/sign-up` modules no longer used.
* `currentLanguage` and onLanguageChange props are deprecated for `/dashboard-sidebar/dashboard-sidebar-footer.tsx`
* - Removed src/layout/user-dashboard-layout.tsx; migrate usages to `src/app/dashboard/(in-layout)/layout.tsx`.
- New env vars required for email:
  - EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD
* **chat:** - Import paths have changed:
  - from "src/components/chat/..." to "src/features/chat/components/..."
  - from "src/hooks/use-chat" to "src/features/chat/hooks/use-chat"
- Removed "src/features/chat/pages/chat-demo-page.tsx"; update any route or import references.
- Consumers must update all chat-related imports to the new feature paths.
* **products:** Product-related imports have been moved from
`features/user-dashboard` to `features/products`.
Update all imports accordingly.
* - `/features/user-dashboard/pages/dashboard-page.tsx` was moved to /app/dashboard/page.tsx. Do not use /user-dashboard/pages feature folder anymore.
- all of `/features/user-dashboard/dashboard-analytics` files was moved to `features/analytics` feature.

## [0.1.1](https://github.com/counterfake/counterfake-dashboard/compare/v0.1.0...v0.1.1) (2025-08-29)


### Bug Fixes

* fix lint errors ([b596a9e](https://github.com/counterfake/counterfake-dashboard/commit/b596a9eebe3a6ab3979aa8a507feb5f7dd754ff3))
* fix suspense error ([7c2eeda](https://github.com/counterfake/counterfake-dashboard/commit/7c2eedab4aaae6d5603c40d09eeaeb234e92edc6))
* fix type errors ([52a0b1d](https://github.com/counterfake/counterfake-dashboard/commit/52a0b1d3b829942e0199609e7ede6464314754f3))

## [0.1.1-beta.1](https://github.com/counterfake/counterfake-dashboard/compare/v0.1.0...v0.1.1-beta.1) (2025-08-29)


### Bug Fixes

* fix lint errors ([b596a9e](https://github.com/counterfake/counterfake-dashboard/commit/b596a9eebe3a6ab3979aa8a507feb5f7dd754ff3))
* fix suspense error ([7c2eeda](https://github.com/counterfake/counterfake-dashboard/commit/7c2eedab4aaae6d5603c40d09eeaeb234e92edc6))
* fix type errors ([52a0b1d](https://github.com/counterfake/counterfake-dashboard/commit/52a0b1d3b829942e0199609e7ede6464314754f3))
