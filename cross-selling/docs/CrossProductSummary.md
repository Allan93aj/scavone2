# Cross-selling Product Summary

The `cross-product-refresh-button` allows users to dismiss one of the options on the Cross-selling in exchange for one of the unused ones to be used in its place.

## Configuration

1. Import the `STORE_NAME.cross-selling` app to your theme's dependencies in the manifest.json:

```json
"dependencies": {
  "STORE_NAME.cross-selling": "1.x"
}
```

2. Add the `cross-selling-summary` block to your store theme as a block of `cross-product-list`. For example:

```json
  "cross-product-list": {
    "blocks": ["cross-product-summary"]
  },
  "cross-product-summary": {
    "children": [
      "product-summary-name",
      "product-list-price",
      "product-selling-price",
      "product-installments",
      "product-summary-sku-selector",
    ]
  }
```
