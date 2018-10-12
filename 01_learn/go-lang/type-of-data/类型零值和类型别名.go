package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

type 别名 int32
func main() {
	var i int32
	var j float32
	var b bool
	var d complex64
	var s string

	fmt.Print("int32: ")
	fmt.Println(i) // int32: 0
	fmt.Print("float32: ")
	fmt.Println(j) // float32: 0
	fmt.Print("bool: ")
	fmt.Println(b) // bool: false
	fmt.Print("complex64: ")
	fmt.Println(d) // complex64: (0+0i)
	fmt.Print("string: ")
	fmt.Println(s) // string:

	var i_b 别名
	var i_n int32

	fmt.Print("i_b 别名 默认值: ")
	fmt.Print(i_b) // 别名: 0
	fmt.Print(", i_b 别名 数据类型: ")
	fmt.Print(reflect.TypeOf(i_b))
	fmt.Print(", i_b 别名 占用大小: ")
	fmt.Println(unsafe.Sizeof(i_b))
	// Result: i_b 别名 默认值: 0, i_b 别名 数据类型: main.别名, i_b 别名 占用大小: 4

	fmt.Print("i_n int32 默认值: ")
	fmt.Print(i_n) // 别名: 0
	fmt.Print(", i_n int32 数据类型: ")
	fmt.Print(reflect.TypeOf(i_n))
	fmt.Print(", i_n int32 占用大小: ")
	fmt.Println(unsafe.Sizeof(i_n))
	// Result: i_n int32 默认值: 0, i_n int32 数据类型: int32, i_n int32 占用大小: 4

	// 不同类型不能运算, 包括别名
}
