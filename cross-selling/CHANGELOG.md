# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2023-08-11

### Added

- Added `countMainProduct` prop to `cross-selling-items-quantity` block, allowing to define how items should be counted.
- More agnostic `main-product-layout` block.

### Fixed

- CrossProductSummary children can now use `product-summary-image` and `product-summary-sku-selector` blocks normally.
- Fixed inconsistencies in documentation.

### Removed

- Removed `syncVariation` prop.
- Removed `cross-product-tag` in favor of new `main-product-layout`

## [1.1.1] - 2023-06-26

### Fixed

- Cross-selling would not show products whenever `maxVisibleProducts` was greater than the total amount of products.

## [1.1.0] - 2023-05-15

### Added

- Added `maxVisibleProducts` prop to `cross-selling-provider`.
- New refresh system, including `cross-product-refresh-button` block.

## [1.0.1] - 2023-04-11

### Changed

- Fixed `cross-product-summary` containers width by adding `flex: 1` property by default.

## [1.0.0] - 2023-03-07

### Added

- Class name modifier to differentiate *checked* and *unchecked* product layouts.

### Changed

- BREAKING CHANGE: Most components were delete and replaced with `vtex.product-summary` implementation.

## [0.0.1]

### Added

- Initial release.
