package show

import (
	"fmt"
	"../learn"
)

func init() {
	fmt.Println("show init")
}

func Show() {
	learn.Learn()
	fmt.Println("show func")
}
