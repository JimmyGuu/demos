package main

import "fmt"

func main() {
	// 在const关键字出现时将被重置为0
	const h = iota
	const i = iota
	fmt.Print("h值为: ")
	fmt.Print(h)
	fmt.Print(", i值为: ")
	fmt.Println(i)
	// h值为: 0, i值为: 0


	// const中每新增一行常量声明将使iota +1
	const (
		j = iota
		k = iota
	)
	fmt.Print("j值为: ")
	fmt.Print(j)
	fmt.Print(", k值为: ")
	fmt.Println(k)
	// j值为: 0, k值为: 1


	// 跳值使用法
	const (
		l = iota
		m = iota
		_
		n = iota
	)
	fmt.Print("l值为: ")
	fmt.Print(l)
	fmt.Print(", m值为: ")
	fmt.Print(m)
	fmt.Print(", n值为: ")
	fmt.Println(n)
	// l值为: 0, m值为: 1, n值为: 3


	// 插队使用法
	const (
		o = iota
		p = 3.14
		q = iota
	)
	fmt.Print("o值为: ")
	fmt.Print(o)
	fmt.Print(", p值为: ")
	fmt.Print(p)
	fmt.Print(", q值为: ")
	fmt.Println(q)
	// o值为: 0, p值为: 3.14, q值为: 2


	// 表达式隐式使用法
	// 自动向上使用非空表达式
	const (
		r = iota * 2
		s = iota * 3
		t
		u
	)
	fmt.Print("r值为: ")
	fmt.Print(r)
	fmt.Print(", s值为: ")
	fmt.Print(s)
	fmt.Print(", t值为: ")
	fmt.Print(t)
	fmt.Print(", u值为: ")
	fmt.Println(u)
	// r值为: 0, s值为: 3, t值为: 6, u值为: 9


	const (
		aa, bb = iota, iota + 3
		cc, dd
		ee = iota
	)
	fmt.Print("aa值为: ")
	fmt.Print(aa)
	fmt.Print(", bb值为: ")
	fmt.Print(bb)
	fmt.Print(", cc值为: ")
	fmt.Print(cc)
	fmt.Print(", dd值为: ")
	fmt.Print(dd)
	fmt.Print(", ee值为: ")
	fmt.Println(ee)
	// aa值为: 0, bb值为: 3, cc值为: 1, dd值为: 4, ee值为: 2
}
