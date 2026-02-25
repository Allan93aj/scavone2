const BannerSchema = {
  title: 'Banner',
  type: 'object',
  properties: {
    src: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    width: {
      title: 'Largura',
      type: 'number',
    },
    height: {
      title: 'Altura',
      type: 'number',
    },
    alt: {
      title: 'Texto alternativo para imagem',
      type: 'string',
    },
    bottomText: {
      title: 'Texto inferior',
      description: 'Aparece abaixo do banner',
      type: 'string',
    },
  },
};

const MenuItemSchema = {
  title: 'Item do menu',
  type: 'object',
  properties: {
    label: {
      title: 'Texto',
      type: 'string',
    },
    href: {
      title: 'URL',
      description: 'Link de redirecionamento',
      type: 'string',
    },
    highlight: {
      title: 'Destaque',
      type: 'boolean',
    },
  },
};

const SubmenuSchema = {
  title: 'Submenu',
  type: 'object',
  properties: {
    items: {
      title: 'Itens',
      type: 'array',
      items: MenuItemSchema,
    },
  },
};

const MegaMenuItemSchema = {
  title: 'Item do mega menu',
  type: 'object',
  properties: {
    label: {
      title: 'Texto',
      type: 'string',
    },
    href: {
      title: 'URL',
      type: 'string',
    },
    submenus: {
      title: 'Submenus',
      type: 'array',
      items: SubmenuSchema,
    },
    banner: BannerSchema,
  },
};

const MegaMenuSchema = {
  title: 'Mega menu',
  type: 'object',
  properties: {
    items: {
      title: 'Menus',
      type: 'array',
      items: MegaMenuItemSchema,
    },
  },
};

export { MegaMenuSchema };
