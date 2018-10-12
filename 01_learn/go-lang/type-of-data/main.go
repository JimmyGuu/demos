package main

import (
	"fmt"
	"unsafe"
)

func main() {
	// var i uint8 = 1   // 1
	// var i uint32 = 1  // 4
	var i uint = 1   // 8
	fmt.Println(unsafe.Sizeof(i))

	var j float32 = 1 // 4
	fmt.Println(unsafe.Sizeof(j))

	var b bool = true
	fmt.Println(b)

	var bt byte = 1 // 1  类似 uint8
	fmt.Println(unsafe.Sizeof(bt))

	var r rune = 1 // 4  类似 int32
	fmt.Println(unsafe.Sizeof(r))
}
