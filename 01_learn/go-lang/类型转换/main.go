package main

import (
	"fmt"
	"reflect"
)

func main() {
	var a int = 1
	var b float32 = 2.3

	c := float32(a)

	fmt.Print(c)
	fmt.Print(" ")
	fmt.Println(reflect.TypeOf(c))

	d := int32(b)
	fmt.Print(d)
	fmt.Print(" ")
	fmt.Println(reflect.TypeOf(d))
}
