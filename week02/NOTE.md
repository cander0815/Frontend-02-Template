学习笔记

## 文法

1, 乔姆斯基文法

* 0 型 无限制文法
* 1型 上下文相关文法
* 2型 上下文无关文法
* 3型 正则文法
0 > 1 > 2 > 3 包含关系
产生式 BNF(巴科斯-诺尔范式)

尖括号括起来的名称表示语法结构名
语法结构分成基础结构和需要用其他语法结构定义的复合结构
基础结构成终结符
复合结构成非终结符
引号和中间的字符表示终结符
可以有括号
* 表示重复多次
| 表示或
+ 表示至少一次

## 语言的分类

1 . 用途

数据描述语言 JSON HTML CSS SQL XAML

编程语言 C C++ Java JavaScript Python

2. 表达方式

声明式 JSON HTML XAML CSS

命令型 C C++ Java JavaScript 等

一般命令式编程

Atom => Expression => Statement => Structure => Peogram

数据类型

* Number
* String
* Boolean
* Object
* Null
* Undefined
* Sysmbol (转用于Object的属性名)
* BigInt

### Number

* Float 小数表示
* IEEE
	* 1个符号位 正负
	* 11个指数位
	* 52个精度位 (隐藏位值永为1) 

* 0b 二进制
* 0o 八进制
* 0x 16进制

### String 

Character 字符  =>   Code Point (ChatCode) 数字 => Encoding 二进制

* 字符集
	* ASCII  只有127个编码基本的英文和标点符号
	* Unicode 所有语言的字符都可以表示 0000 ~ FFFF
	* UCS 
	* GB
	* GB2312 第一个版本
	* GBK(GB13000) 第二个版本
	* GB18030 目前比较全的中文字符
	* ISO-8859 东欧国家的编码
	* BIG5  

 ### Object

* 三种对象的语法
	* {}, ., [], Object.defineProperty 
	* Object.create, Object.setPrototypeOf, Object.getPrototypeOf
	* new, class, extends

Function 带[[call]]行为的对象








