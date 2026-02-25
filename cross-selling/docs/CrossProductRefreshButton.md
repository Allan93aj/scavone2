# Cross-selling Product Refresh Button

The `cross-product-refresh-button` defines the layout of each product display rendered by `cross-product-list` block.
It can receive special child blocks to show informations on the product.

## Configuration

1. Import the `STORE_NAME.cross-selling` app to your theme's dependencies in the manifest.json:

```json
"dependencies": {
  "STORE_NAME.cross-selling": "1.x"
}
```

2. Add the `cross-selling-refresh-button` block to your store theme as a block of `cross-product-summary`. For example:

```json
  "cross-product-summary": {
    "children": [
      "cross-product-refresh-button",
      "product-summary-name",
      "product-list-price",
      "product-selling-price"
    ]
  }
```

3. Then, declare the `cross-product-refresh-button` and configure its behavior using the props stated below.

| Prop name        | Type          | Description                | Default value  |
| :--------------: | :---------: | :--------------------------: | :------------: |
| `icon` | `object` |  Props object for an icon image to be rendered. | `undefined` |
| `text` | `string` |  Text to be displayed inside button. Can be used alongside `icon`, or omitted. | `undefined` |
| `allowRefreshingMainProduct` | `boolean` |  By default users won't be allowed to refresh the main product, keeping it always on display. Setting this property to `true` changes this behavior to allow so. | `undefined` |

The `icon` property uses [VTEX's Image component](https://developers.vtex.com/docs/apps/vtex.store-components/Image) under the hood. Any property compartible with it is valid on `icon` prop for the `cross-product-refresh-button` block.

### ⚠️ Warning

This component won't be rendered if the max visible products value is lower than the total registered products for the given Cross-selling endpoint. It works this way to prevent misleading users to click without the actual options to choose from.
