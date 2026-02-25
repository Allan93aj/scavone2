# Cross Selling

This app provides a very useful collection of blocks to help with cross-sellings configuration.

## Blocks

### `scavone-cross-selling-provider`

The context provider itself. It should wrap any of the following blocks in order for it to work.

#### Props

- `endPoint` - URL to request the products. It's expected a return of type `ProductTypes.Product[]`.
- `excludeMainProduct` - By default, the cross selling will include the main product from the product context as the first item of the product list. By setting this prop to `true`, it no longer includes it.

### `scavone-cross-add-to-cart-button`

Renders the button to add all currently selected products to cart, and triggers the minicart event.

#### Props

- `text` - Text that will be rendered inside the button.

### `scavone-cross-selling-price`

Renders the combined price of all selected products together.

#### Props

- `message` - Defines a custom message to display. Use `{value}` marker to render the price.

### `scavone-cross-product-list` and `scavone-cross-product-summary`

These blocks together defines the layout of the products informations to be rendered.

```json
{
  "scavone-cross-product-list#buy-together": {
    "blocks": ["scavone-cross-product-summary#buy-together"]
  },
  "scavone-cross-product-summary#buy-together": {
    "children": [
      "scavone-cross-product-image",
      "scavone-cross-product-name",
      "scavone-cross-product-selling-price"
    ]
  }
}
```

The example above renders each product with an image, name and selling price.
