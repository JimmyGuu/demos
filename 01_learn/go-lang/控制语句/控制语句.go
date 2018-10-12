package main

import "fmt"

func main() {
	//a := 1
	//if a < 0 {
	//	fmt.Println("a 小于 0")
	//} else {
	//	fmt.Println("a 不小于 0")
	//}
	
	// for 循环
	//for i := 1; i <= 10; i++ {
	//	fmt.Println(i)
	//	time.Sleep(1 * time.Second)
	//}

	// forEach 循环
	//b := []string{"字符串1", "字符串2", "字符串3", "字符串4", "字符串5"}
	//for key, value := range b {
	//	fmt.Print("key的值为: ")
	//	fmt.Println(key)
	//	fmt.Print("value的值为: ")
	//	fmt.Println(value)
	//}

	// goto
	goto One
	fmt.Println("代码块1")
	fmt.Println("代码块2")
	One:
		fmt.Println("代码块One")
	fmt.Println("代码块Two")

	// break
	for i := 1; i <= 3; i++ {
		for j := 0; j < 3; j++ {
			fmt.Print("循环体-")
			fmt.Print(i)
			fmt.Print("-")
			fmt.Println(j)
			break
		}
	}

	// continue
	for i := 0; i < 3; i++ {
		if i > 1 {
			fmt.Println("满足i > 1, continue, 跳出本次循环")
			continue
		}

		fmt.Print("当前下标为: ")
		fmt.Println(i)
	}
}
