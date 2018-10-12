package main

import "fmt"

func main() {
	a := byte(0)
	b := byte(1)

	fmt.Print("a 的值为: ")
	fmt.Println(a)
	fmt.Print("b 的值为: ")
	fmt.Println(b)

	fmt.Println("")

	fmt.Print("a&b 的值为: ")
	fmt.Println(a&b)

	fmt.Print("a|b 的值为: ")
	fmt.Println(a|b)

	fmt.Print("a^b 的值为: ")
	fmt.Println(a^b)
	fmt.Print("a^a 的值为: ")
	fmt.Println(a^a)

	fmt.Print("b << 1 的值为: ")
	fmt.Println(b << 1)

	fmt.Print("b >> 1 的值为: ")
	fmt.Println(b >>1 )
}
