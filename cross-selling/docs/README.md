# Cross-selling

Build amazing Cross-selling layouts with the Cross Selling app blocks!

## Configuration

This app is not published to be used out-of-the-box, so it is required to create a copy on the store you wish following the steps below:

1. Clone the repository where you wish to have it;
2. Delete its `.git` directory, so it becomes a raw source of your repository;
3. Change the vendor in the `manifest.json` file;
4. Import the `STORE_NAME.cross-selling` app to your theme's dependencies in the `manifest.json`:

```json
  "dependencies": {
    "STORE_NAME.cross-selling": "1.x"
  }
```

Now, you are able to use all blocks exported by the `product-summary` app. Check out the full list below:

| Block name     | Description | 
| -------------- | ----------- | 
| [`cross-selling-provider` ](/docs/CrossSellingProvider.md) | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Provides the Cross-selling data from fetched from `endPoint` prop for its children. | 
| `cross-add-to-cart-button` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Renders the Add to cart button including all selected products. |
| [`cross-selling-items-quantity`](/docs/CrosssSellingItemsQuantity.md) | Renders a configurable message displaying the total amount of products selected. |
| [`cross-selling-price` ](/docs/CrossSellingPrice.md) | Renders the total price of the Cross-selling products. |
| [`cross-product-list`](/docs/CrossProductList.md) | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Renders the list of products provided by `cross-selling-provider` block. It fetches product data and provides it to the `cross-selling-summary` block. This block, then, provides its child blocks with the product data. | 
| [`cross-product-summary`](/docs/CrossProductSummary.md) | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Logical block responsible for providing the needed structure for the `cross-product-summary` block through its child blocks (listed below). 
| `cross-product-checkbox` | Renders a checkbox to allow users to unselect certain products. | 
| [`cross-product-refresh-button`](/docs/CrossProductRefreshButton.md) | Renders a button to refresh the product with an unused one. Requires `maxVisibleProducts` value to be lower than the total amount of products. |
| `main-product-layout` | Build specific layouts for the main product within a `cross-product-summary`. |

## Modus Operandi

When providing an `endPoint` prop to the `cross-selling-provider` block, make sure that it is one of [Cross-selling APIs](https://help.vtex.com/announcements/weve-released-our-new-cross-selling-and-up-selling-apis--37Lc6sI2owMCiUamocgAcc) or that it matches its return type.
