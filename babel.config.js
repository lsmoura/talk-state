module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return ({
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: '3',
          useBuiltIns: 'entry',
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  });
};
