package main

import (
	"fmt"
	"reflect"
)

// 全局变量var是必须的
var a int
var b string = "abc"
// 分组方式
var (
	c string
	d int
	e string = "小明"
)

func main() {
	fmt.Println(a) // 0

	a = 123 // 赋值
	fmt.Println(a) // 123

	fmt.Println(b) // abc

	fmt.Print("c: ")
	fmt.Print(c)
	fmt.Print(", d: ")
	fmt.Print(d)
	fmt.Print(", e: ")
	fmt.Println(e)
	// c: , d: 0, e: 小明

	var f, g, h int = 1, 2, 3
	fmt.Print("f: ")
	fmt.Print(f)
	fmt.Print(", g: ")
	fmt.Print(g)
	fmt.Print(", h: ")
	fmt.Println(h)
	// f: 1, g: 2, h: 3

	var i, j, k = 11, 21.3, 31
	fmt.Print("i: ")
	fmt.Print(i)
	fmt.Print("i 数据类型为: ")
	fmt.Print(reflect.TypeOf(i))
	fmt.Print(", j: ")
	fmt.Print(j)
	fmt.Print(", j 数据类型为: ")
	fmt.Print(reflect.TypeOf(j))
	fmt.Print(", k: ")
	fmt.Println(k)
	// i: 11i 数据类型为: int, j: 21.3, j 数据类型为: float64, k: 31

	// 冒号简写，只能在函数体内使用
	l, m, n := 11, 21.3, "c"
	fmt.Print("l: ")
	fmt.Print(l)
	fmt.Print(", m: ")
	fmt.Print(m)
	fmt.Print(", n: ")
	fmt.Println(n)
	// l: 11, m: 21.3, n: c

	// 下划线
	var o, _, p = 11, 21.3, 31
	fmt.Print("o: ")
	fmt.Print(o)
	fmt.Print(", p: ")
	fmt.Print(p)
	// fmt.Print(", _: ")
	// fmt.Println(_) // 下划线不能被打印
	// o: 11, p: 31
}
