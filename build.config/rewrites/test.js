module.exports = [
  {
    source: '/connect/:path*',
    destination: 'http://192.168.67.51:8080/connect/:path*',
  },
  {
    source: '/portkey/:path*',
    destination: 'https://localtest-applesign2.portkey.finance/:path*',
  },
  {
    source: '/api/:path*',
    destination: 'https://soho-test2.beangotown.com/api/:path*',
  },
  {
    source: '/cms/:path*',
    destination: 'http://192.168.66.205:8100/:path*',
  },
  {
    source: '/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
    destination: 'http://192.168.67.51:8083/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
  },
  {
    source: '/AElfIndexer_BeangoTown/BeangoTownIndexerPluginSchema/:path*',
    destination: 'http://192.168.66.159:8095/AElfIndexer_BeangoTown/BeangoTownIndexerPluginSchema/:path*',
  },
];
