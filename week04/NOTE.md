学习笔记

## 浏览器打开网页的步骤

url = http => html = parse => dom = css computing => Dom with css = layout => dom with position = render => bitmap

## 状态机

有限状态机

* 每个状态都是一个机器
* 每个机器都可以计算 存储 输出
* 每个机器代表一个状态, 机器接受的输入是一致的
* 状态机本身没有状态, 如果用函数表示应该是应该是纯函数
* 每一个机器都知道下一个状态 
	* 每个机器都有确定的下一个状态(Moore)
	* 每个机器根据输入决定下一个状态(Mealy) 使用较多

```
	function state(input) {
		return next;
	}

	while(input) {
		state = state(input);
	}
``` 

# 网络协议

* 应用  
* 传输
* 网络
* 数据链路
* 物理层












