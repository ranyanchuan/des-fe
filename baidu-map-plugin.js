export default (api, opts) => {

  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js',
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'http://api.map.baidu.com/api?v=2.0&ak=MaF5RPSfVdWeNqjlmZART93qXVoPiZ2N',
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js',
  });


};
