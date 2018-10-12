// 程序所属包
package main
// 导入依赖包
import "fmt"
// 常量定义
const NAME string = "John"
// 全局变量声明与赋值
var name string = "Bob"
// 一般类型声明
type typeInt int
// 结构声明
type Learn struct { }
// 接口声明
type ILeran interface { }
// 函数定义
func learnFoo() {
	fmt.Println("learn foo")
}

// main()函数
func main() {
	fmt.Println("simple demo")
	fmt.Println(NAME)
	fmt.Println(name)

	learnFoo()
}
