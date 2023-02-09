### 对于HTML：
1. 避免再HTML中直接写css代码。
2. 使用Viewport加速页面的渲染。
3. 使用语义化标签，减少css的代码，增加可读性和SEO。
4. 减少标签的使用，dom解析是一个大量遍历的过程，减少无必要的标签，能降低遍历的次数。
5. 避免src、href等的值为空。
6. 减少dns查询的次数。

### 对于css：
1. 优化选择器路径：健全的css选择器固然是能让开发看起来更清晰，然后对于css的解析来说却是个很大的性能问题，因此相比于 .a .b .c{} ，更倾向于大家写.c{}。
2. 压缩文件：尽可能的压缩你的css文件大小，减少资源下载的负担。
3. 选择器合并：把有共同的属性内容的一系列选择器组合到一起，能压缩空间和资源开销
4. 精准样式：尽可能减少不必要的属性设置，比如你只要设置{padding-left:10px}的值,那就避免{padding:0 0 0 10px}这样的写法
5. 雪碧图：在合理的地方把一些小的图标合并到一张图中，这样所有的图片只需要一次请求，然后通过定位的方式获取相应的图标，这样能避免一个图标一次请求的资源浪费。
6. 避免通配符：.a .b *{} 像这样的选择器，根据从右到左的解析顺序在解析过程中遇到通配符（*）回去遍历整个dom的，这样性能问题就大大的了。
7. 少用Float:Float在渲染时计算量比较大，尽量减少使用。
8. 0值去单位：对于为0的值，尽量不要加单位，增加兼容性
  

### 对于JavaScript：
1. 尽可能把script标签放到body之后，避免页面需要等待js执行完成之后dom才能继续执行，最大程度保证页面尽快的展示出来。
2. 尽可能合并script代码，
3. css能干的事情，尽量不要用JavaScript来干。毕竟JavaScript的解析执行过于直接和粗暴，而css效率更高。
4. 尽可能压缩的js文件，减少资源下载的负担
5. 尽可能避免在js中逐条操作dom样式，尽可能预定义好css样式，然后通过改变样式名来修改dom样式，这样集中式的操作能减少reflow或repaint的次数。
6. 尽可能少的在js中创建dom，而是预先埋到HTML中用display:none来隐藏，在js中按需调用，减少js对dom的暴力操作。