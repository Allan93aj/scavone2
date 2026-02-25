/**
 * Especifies VTEX catalog API's cross-selling as [`/api/catalog_system/pub/products/crossselling/{CrossSellingType}/{productId}`].
 *
 * See more at [API Reference](https://developers.vtex.com/vtex-rest-api/reference/productsearchwhosawalsosaw#productsearchwhosawalsosaw)
 */
export type CrossSellingType =
  | 'suggestions'
  | 'similars'
  | 'whosawalsosaw'
  | 'whosawalsobought'
  | 'whoboughtalsobought'
  | 'accessories'
