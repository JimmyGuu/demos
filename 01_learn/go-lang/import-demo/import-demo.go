package main

import (
	myFmt "fmt" // 别名
	_ "./src/show" // 下划线
	"./src/learn"
	)

// 所有依赖包初始化完成后
// 才执行main的初始化函数
func init() {
	myFmt.Println("import-demo init")
}

func main() {
	// learn的init函数只执行了一次
	// 可知多次导入只被导入一次
	learn.Learn()
	// show.Show()

	myFmt.Println("Hello world")
}
