学习笔记


## 运算符和表达式

> javascript obj.key 取出的并不是值, 而是一个引用类型(Reference 该类型不存在于语言中, 因此我们称它为标准中的类型)

### 运算符优先级和左手运算符

1. Member
	* 取值运算
		* `a.b`
		* `a[b]`
	* <code>foo'string'</code> (调用函数, 并将后面的字符串作为入参)
	* super.b
	* super['b']
	* new.target
	* new Foo() 
2. New 

```
new a()()  => (new a())()

new new a() => new (new a())
```

3. Call
	* funName()
	* super()
	* foo()[b]
	* foo().b
	* foo()`abc`

	```
		new a()[b] => (new a())[b]	
	```
	
### 左手运算和右手运算

> 已上三种是左手运算, 以下的都是右手运算

`a.b = c` 可以 左手运算
`a+b = c` 不可以 右手运算

不能构成左手的所有运算都是右手运算

### 右手运算符

1. Update
	* a ++
	* a--
	* ++a
	* ++a

2. Unary (单目运算)
	* delete a.b
	* void foo()
	* typeof a
	* + a (字符串的话拼接, 数字不会改变)
	* - a (字符串的话会转换为数字)
	* ~ a (按位取反)
	* ! a (将值强制转换成boolean)
	* await a
3. Exponental 
	`**` (唯一的一个右结合运算符)
	```
	3 ** 2 ** 3 => 3 ** (2 ** 3)
	```
4. (基本运算符)
	* `/` `*`
	* `-` `+`
	* `<<` `>>` `>>>` (位运算) 
	*  `<` `>` `<=` `>=` `instanceof` `in`
5. 比较运算
	* `==`
	* `!=`
	* `===`
	* `!==`
6. 位运算
	* `&` `^` `|`
7. 逻辑运算
	* `&&` `||`
	* `? : `

	
## 类型转换


## 拆箱转换(`ToPremitive`)

> 将Object类型转换为普通类型

对象上有三个方法的定义会影响到拆箱
* `toString()`
* `valueOf()`
* `[Symbol.toPrimitive]()`

如果定义了`[Symbol.toPrimitive]()` 会忽略`toString()`和`valueOf()`

根据不同的情况觉得调用`toString()`和`valueOf()`的优先顺序

`+`号运算会优先调用`valueOf()`
`obj[key]`作为属性名的时候会优先调用`toString()`

需要用到字符串的地方就会优先调用`toString`
别的都是优先调用`valueOf()`

## 装箱转换





## 语句

* Atom
* Expression
* Statement(语句)
* Structure
* Program/Module

### 语句 Grammar

* 简单语句 (语句内部不会在容纳别的语句)
	* ExpressionStatement 表达式语句`label: vale`
	*  EmptyStatement 空语句 单独一个分号
	*  DebuggerStatement debugger 语句 触发断点
	* ThrowStatement (流程控制)抛出异常
	*  ContinueStatement (流程控制)循环语句配合使用 continue
	*  BreakStatement (流程控制)循环语句配合使用 break
	*  ReturnStatement (流程控制)函数中返回值
* 组合语句
	* BlockStatement 两个花括号(`{}`)组成,  包裹单条语句, 完成树状结构的重要基础设施
		* [[type]]: normal
		* [[value]]: --
		* [[target]]: --	
	* ifStatement
	* SwitchStatement 性能和if else if差不多
	* IterationStatement 循环语句
		* while
		* do while
		* for
		* for in
		* for of
		* <s>fo await(of)</s>
	* WithStatement with 关键字
	* LabelledStatement label
	* TryStatement `try` `catch` `finally`
		*  [[type]]: return
		*  [[value]]: --
		*  [[target]]: label
		*  `try`中的`return`不会打断`finally`中的代码执行		
* 声明
	*  	FunctionDeclaraction function 关键字
	*   GeneratorDeclaration function 后加*
	*   AsyncFunctionDeclaration funciton 前加async
	*   AsyncGeneratorDeclaration function 前加async后加*
	*   VarisbleStatement 变量声明, 既可以声明又可以计算
	
	--- 以上出现会出现变量提示, 被提升到第一行执行
	   
	*   ClassDeclaration `class`
	*   LexicalDeclaration `const` `let`

	--- 以上两个在声明前去使用会报错


Runtime
* Completion Record (语句的完成状态,  执行结果记录)
	* [[type]]: normal, break, continue, return, or thorw
	* [[value]]:类型
	* [[target]]: label `label: for(...)` 一个带label的语句小示例	 
* Lexical Exvironment (作用域相关)
	*  

### 预处理机制

`var` 会在预处理时就变量提升

`const` 在预处理时不存在变量提示, 但是在声明前使用会报错


## JS执行粒度

* 宏任务
	* 用户编写的代码
	*  	
* 微任务
* 函数调用
	*  栈式调用 Execution Context Stack
		* Running Execution Context  
		* Execution Context 执行上下文
			*  code evaluation state `async` `generator`
			*  Function 
			*  Script or Module
			*  Genarator
			*  Realm 保存所有内置对象
			*  LexicalEvironment 保存变量
			*  VariabelEnvironment  保存变量 var 声明到哪个环境中	
* 语句/声明
* 表达式
* 直接量/变量/this

### 事件循环

* 获取代码
* 执行代码
* 等待


### Execution Context 执行上下文

* ECMAScript Code Execution Context
	*  code evaluation state `async` `generator`
	*  Function 
	*  Script or Module
	*  Realm 保存所有内置对象
	*  LexicalEvironment 保存变量
	*  VariabelEnvironment  保存变量 var 声明到哪个环境中
* Generator Execution Contexts 
	*  code evaluation state `async` `generator`
	*  Function 
	*  Script or Module
	*  Realm 保存所有内置对象
	*  LexicalEvironment 保存变量
	*  VariabelEnvironment  保存变量 var 声明到哪个环境中
	*  Genarator
	
#### LexicalEvironment 

* 在旧的标准中仅仅存储变量
* 在2018以后的标准中存储执行时的所有, 包括有 this, 变量, new实例后的对象, super等

#### VariabelEnvironment

仅仅处理var声明






