# Cross-selling Product List

The `cross-product-list` renders a given [`cross-product-summary`](/docs/CrossProductSummary.md) block for it product from the Cross-selling list.

## Configuration

1. Import the `STORE_NAME.cross-selling` app to your theme's dependencies in the manifest.json:

```json
"dependencies": {
  "STORE_NAME.cross-selling": "1.x"
}
```

2. Add the `cross-product-list` block to your store theme as a child of [`cross-selling-provider`](/docs/CrossSellingProvider.md), passing a `cross-product-summary` as block. For example:

```json
  "cross-selling-provider": {
    "children": [
      "rich-text#cross-selling-title",
      "cross-product-list"
    ]
  },
  "cross-product-list": {
    "blocks": ["cross-product-summary"]
  }
```

3. Then, declare the `cross-product-list` and configure its behavior using the props stated below.

| Prop name        | Type          | Description                | Default value  |
| :--------------: | :---------: | :--------------------------: | :------------: |
| `hideMainProduct` | `boolean` | Whether to hide main product. | `false` |

### ⚠️ Warning

The `hideMainProduct` property will only make the product not display on the list, but its price is still considered and will be added to the cart upon
clicking on `cross-add-to-cart-button` block.

If you intend on *excluding* the main product as a whole, check `excludeMainProduct` property on [Cross-selling Provider block](/docs/CrossSellingProvider.md).
