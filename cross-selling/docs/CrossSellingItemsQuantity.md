# Cross-selling items quantity
/**
 * 
 *
 * ## Markers
 *
 * Use these markers around a block to display dynamic values.
 *
 * - `quantity` - Quantity of items
 */

The `cross-selling-items-quantity` renders a message telling how many items are selected.

## Configuration

1. Import the `STORE_NAME.cross-selling` app to your theme's dependencies in the manifest.json:

```json
"dependencies": {
  "STORE_NAME.cross-selling": "1.x"
}
```

2. Add the `cross-selling-price` block to your store theme as a child of `cross-selling-provider`. For example:

```json
  "cross-selling-provider": {
    "children": [
      "rich-text#cross-selling-title",
      "cross-selling-price"
    ]
  },
  "cross-selling-price": {
    "props": {
      "message": "{value}"
    }
  }
```

3. Then, declare the `cross-selling-price` and configure its behavior using the props stated below.

| Prop name        | Type          | Description                | Default value  |
| :--------------: | :---------: | :--------------------------: | :------------: |
| `message` | `string` |  Defines the block's default text. | `{value}` |

The message property allows the following variables to edit the desired messages using the admin's Site Editor:

| Message variable | Type | Description |
| --- | --- | --- |
| `quantity` | `string` | Quantity of selected items. |
