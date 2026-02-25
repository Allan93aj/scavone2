# Cross-selling Provider

The `cross-selling-provider` is the main block that fetches all the required informations and passes down as a context for its children.

## Configuration

1. Import the `STORE_NAME.cross-selling` app to your theme's dependencies in the manifest.json:

```json
"dependencies": {
  "STORE_NAME.cross-selling": "1.x"
}
```

2. Add the `cross-selling-provider` block to your store theme as a child of `cross-selling-provider`. For example:

```json
  "cross-selling-provider": {
    "props": {
      "endPoint": "/api/catalog_system/pub/products/crossselling/showtogether/{productId}"
    },
    "children": [
      "rich-text#cross-selling-title",
      "cross-product-list",
      "cross-selling-price"
      "cross-add-to-cart-button"
    ]
  }
```

3. Then, declare the `cross-selling-provider` and configure its behavior using the props stated below.

| Prop name        | Type          | Description                | Default value  |
| :--------------: | :---------: | :--------------------------: | :------------: |
| `endPoint` | `string` |  Defines where should the products be fetched from. They would usually be one of the [Cross-selling APIs](https://help.vtex.com/announcements/weve-released-our-new-cross-selling-and-up-selling-apis--37Lc6sI2owMCiUamocgAcc), or match the return type of those. | `undefined` |
| `maxVisibleProducts` | `number` |  Limits how many products will be shown in this Cross-selling layout. | `2` |
| `excludeMainProduct` | `boolean` |  Whether the main product from the page context should be excluded from the list.  | `false` |
