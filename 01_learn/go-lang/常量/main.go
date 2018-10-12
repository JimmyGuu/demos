package main

import "fmt"

const a string = "常量a" // 显式
const b = "常量b" // 隐式
const (
	c string = "常量c"
	d = "常量d"
)
const e, _, f = "常量e", "下划线", 6
const g = len(a) // 只支持内置函数

func main() {
	fmt.Println(a) // 常量a
	fmt.Println(b) // 常量b
	fmt.Println(c) // 常量c
	fmt.Println(d) // 常量d
	fmt.Println(e) // 常量e
	fmt.Println(f) // 6
	fmt.Println(g) // 7
}
