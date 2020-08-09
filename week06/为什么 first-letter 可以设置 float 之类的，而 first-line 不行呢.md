# 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

::first-line CSS pseudo-element （CSS伪元素）在某 block-level element （块级元素）的第一行应用样式。第一行的长度取决于很多因素，包括元素宽度，文档宽度和文本的文字大小。

和其他所有的 伪元素一样，::first-line 不能匹配任何真实存在的html元素。

 ::first-line 伪元素只能在块容器中,所以,::first-line伪元素只能在一个display值为block, inline-block, table-cell 或者 table-caption中有用.。在其他的类型中，::first-line 是不起作用的.
 
 
 
 ::first-letter会选中某 block-level element（块级元素）第一行的第一个字母，并且文字所处的行之前没有其他内容（如图片和内联的表格） 。
 
 如果first-line可以设置float会影响整体的dom元素的布局
 