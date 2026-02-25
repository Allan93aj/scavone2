import React, { useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useProduct } from 'vtex.product-context';
import {
  TabLayout,
  TabContent,
  TabContentItem,
  TabList,
  TabListItem,
} from 'vtex.tab-layout';
import {
  DisclosureLayout,
  DisclosureContent,
  DisclosureTrigger,
  DisclosureLayoutGroup,
} from 'vtex.disclosure-layout';
import { useDevice } from 'vtex.device-detector';

import ProductDescriptionHandles from './ProductDescription.handles';
import type { ProductDescriptionProps } from './ProductDescription.types';

function ProductDescription(props: ProductDescriptionProps) {
  const productContext = useProduct();
  const { handles } = useCssHandles(ProductDescriptionHandles);
  const properties = productContext?.product?.properties;
  const description = productContext?.product?.description;
  const { isMobile } = useDevice();
  const menus = props.menu ?? [];

  const specifications = productContext?.product?.properties?.filter(
    (property) => {
      const details = ['INSTRUÇÕES/CUIDADOS', 'Medidas'];

      return !details.includes(property.name);
    },
  );
  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    const result = menus.map((menu) => {
      const matchingProperty = properties.find(
        (property) =>
          menu.property.toLowerCase() === property.name.toLowerCase(),
      );

      if (!matchingProperty) return null;

      return {
        name: menu.displayName ?? matchingProperty.name,
        value: matchingProperty.values[0],
      };
    });

    const validResults = result.filter(Boolean);

    return [
      {
        name: 'Descrição',
        value: description,
      },
      ...validResults,
    ];
  }, [menus, properties, description]);

  return (
    <section className={handles.productDescriptionContainer}>
      {isMobile ? (
        <DisclosureLayoutGroup>
          {filteredProperties?.map(
            (property) =>
              !!property && (
                <DisclosureLayout>
                  <DisclosureTrigger>{property.name}</DisclosureTrigger>
                  <DisclosureContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: property.value ?? '' }}
                    />
                  </DisclosureContent>
                </DisclosureLayout>
              ),
          )}
          {specifications ? (
            <DisclosureLayout>
              <DisclosureTrigger>Especificações</DisclosureTrigger>

              <DisclosureContent>
                {specifications?.map((property, index) => {
                  return (
                    <div
                      className={handles.specification}
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: property?.values[0] ?? '',
                      }}
                    />
                  );
                })}
              </DisclosureContent>
            </DisclosureLayout>
          ) : null}
          <DisclosureContent />
        </DisclosureLayoutGroup>
      ) : (
        <TabLayout>
          <TabList>
            {filteredProperties?.map(
              (property, index) =>
                !!property && (
                  <TabListItem
                    key={property.name}
                    tabId={property.name}
                    label={property.name}
                    defaultActiveTab={index === 0}
                    position={filteredProperties?.length ?? 0}
                  />
                ),
            )}
            {specifications ? (
              <TabListItem
                tabId="specifications"
                label="Especificações"
                defaultActiveTab={false}
                position={filteredProperties?.length ?? 0}
              />
            ) : null}
          </TabList>
          <TabContent>
            {filteredProperties?.map(
              (property) =>
                !!property && (
                  <TabContentItem tabId={property.name}>
                    <div
                      dangerouslySetInnerHTML={{ __html: property.value ?? '' }}
                    />
                  </TabContentItem>
                ),
            )}
            {specifications ? (
              <TabContentItem tabId="specifications">
                {specifications?.map((property, index) => {
                  return (
                    <div
                      className={handles.specification}
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: property?.values[0] ?? '',
                      }}
                    />
                  );
                })}
              </TabContentItem>
            ) : null}
          </TabContent>
        </TabLayout>
      )}
    </section>
  );
}

export default ProductDescription;
