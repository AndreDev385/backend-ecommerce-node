const validProducts = [
  {
    name: "zoom 38",
    description: "shoes for runners",
    brand: "Nike",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "black",
          },
          {
            name: "size",
            value: "9",
          },
        ],
        assets: {
          defaultImg: {
            src: "Nike zoom default img",
          },
          imgs: [
            {
              src: "nike zoom image",
            },
          ],
        },
        stock: 5,
        price: {
          sellPrice: 19.99,
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },
  {
    name: "pegasus 37",
    description: "amazing running shoes",
    brand: "Nike",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "white",
          },
          {
            name: "size",
            value: "8",
          },
        ],
        assets: {
          defaultImg: {
            src: "Nike pegasus default img",
          },
          imgs: [
            {
              src: "nike pegasus image",
            },
          ],
        },
        stock: 9,
        price: {
          sellPrice: 19.99,
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },
];

const invalidProducts = [
  {
    description: "amazing running shoes",
    brand: "Nike",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "white",
          },
          {
            name: "size",
            value: "8",
          },
        ],
        assets: {
          defaultImg: {
            src: "Nike pegasus default img",
          },
          imgs: [
            {
              src: "nike pegasus image",
            },
          ],
        },
        stock: 9,
        price: {
          sellPrice: 19.99,
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },
  {
    name: "pegassus",
    description: "amazing running shoes",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "white",
          },
          {
            name: "size",
            value: "8",
          },
        ],
        assets: {
          defaultImg: {
            src: "Nike pegasus default img",
          },
          imgs: [
            {
              src: "nike pegasus image",
            },
          ],
        },
        stock: 9,
        price: {
          sellPrice: 19.99,
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },
  {
    name: "pegassus",
    description: "amazing running shoes",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "white",
          },
          {
            name: "size",
            value: "8",
          },
        ],
        assets: {
          imgs: [
            {
              src: "nike pegasus image",
            },
          ],
        },
        stock: 9,
        price: {
          sellPrice: 19.99,
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },

  {
    name: "pegassus",
    description: "amazing running shoes",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "white",
          },
          {
            name: "size",
            value: "8",
          },
        ],
        assets: {
          defaultImg: {
            src: "img",
          },
          imgs: [
            {
              src: "nike pegasus image",
            },
          ],
        },
        price: {
          sellPrice: 19.99,
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },
  {
    name: "zoom 38",
    description: "shoes for runners",
    brand: "Nike",
    categories: [{ name: "shoes" }],
    specificProducts: [
      {
        attrs: [
          {
            name: "color",
            value: "black",
          },
          {
            name: "size",
            value: "9",
          },
        ],
        assets: {
          defaultImg: {
            src: "Nike zoom default img",
          },
          imgs: [
            {
              src: "nike zoom image",
            },
          ],
        },
        stock: 5,
        price: {
          regularPrice: 12.99,
          discountPrice: 15.99,
        },
      },
    ],
  },
];

module.exports = {
  validProducts,
  invalidProducts
};
