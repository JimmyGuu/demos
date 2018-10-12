package main

import (
	"fmt"
	"math/rand"
	"math"
	"runtime"
	"time"
)

func main() {
	fmt.Println("My Favorite number is ", rand.Intn(10))

	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)

	fmt.Println(Sqrt(2))

	fmt.Println(Os())

	fmt.Println(Sat())

	fmt.Println(sayHalo())

	deferPrint()

	counter()

	zhizhen()

	fmt.Println(Vertex{1, 2})

	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v)
	p := &v
	p.X = 1e9
	fmt.Println(v)

	v1 := Vertex{1, 2}
	v2 := Vertex{X: 1}
	v3 := Vertex{}
	p = &Vertex{1, 2}

	fmt.Println(v1, p, v2, v3)

	arr()
}

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
	return lim
}

func Sqrt(x float64) float64 {
	return math.Sqrt(x)
}

func Os() string {
	var osStr string
	fmt.Println("Go runs on")
	switch os := runtime.GOOS; os {
	case "darwin":
		osStr = "OS X."
	case "linux":
		osStr = "Linux."
	default:
		osStr = os
	}

	return osStr
}

func Sat() string {
	var str string
	fmt.Println("When's Saturday")
	today := time.Now().Weekday()
	switch time.Saturday {
	case today + 0:
		str = "Today"
	case today + 1:
		str = "Tomorrow"
	case today + 2:
		str = "In two days"
	default:
		str = "Too far away"
	}

	return str
}

func sayHalo() string {
	var str string
	t := time.Now()
	switch {
	case t.Hour() < 12:
		str = "Good morning"
	case t.Hour() < 17:
		str = "Good afternoon"
	default:
		str = "Good evening"
	}

	return str
}

func deferPrint() {
	defer fmt.Println("world")

	fmt.Print("Halo ")
}

func counter()  {
	fmt.Println("counting")

	for i := 0; i < 5; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}

func zhizhen()  {
	fmt.Println("========指针========")

	i, j := 42, 2701

	p := &i
	fmt.Println(*p)
	*p = 21
	fmt.Println(i)

	p = &j
	*p = *p / 37
	fmt.Println(j)
}

type Vertex struct {
	X int
	Y int
}

func arr() {
	fmt.Println("========数组========")

	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	p := []int{2, 3, 5, 7, 11, 13}
	fmt.Println("p ==", p)

	for i := 0; i < len(p); i++ {
		fmt.Printf("p[%d] == %d\n", i, p[i])
	}

	// 左闭右开 [m, n)
	p2 := []int{2, 3, 5, 7, 11, 13}
	fmt.Println("p2 ==", p2)
	fmt.Println("p2[1:4] ==", p2[1:4])

	fmt.Println("p2[:3] ==", p2[:3])
	fmt.Println("p2[4:] ==", p2[4:])

	// make
	fmt.Println("========make========")
	a2 := make([]int, 5)
	printSlice("a2", a2)
	b2 := make([]int, 0, 5)
	printSlice("b2", b2)
	c2 := b2[:2]
	printSlice("c2", c2)
	d2 := c2[2:5]
	printSlice("d2", d2)

	// nil slice
	var z []int
	fmt.Println(z, len(z), cap(z))
	if z == nil {
		fmt.Printf("z is nil: %v", z)
	}

	// append
	fmt.Println("========append========")
	var a3 []int
	printSlice("a3", a3)

	a3 = append(a3, 0)
	printSlice("a3", a3)

	a3 = append(a3, 1)
	printSlice("a3", a3)

	a3 = append(a3, 2, 3, 4)
	printSlice("a3", a3)

	// range
	var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}

	pow2 := make([]int, 10)
	for j := range pow2 {
		pow2[j] = 1 << uint(j)
	}
	for _, value := range pow2 {
		fmt.Printf("%d\n", value)
	}


	fmt.Println("========map========")
	var m map[string]Vartex
	m = make(map[string]Vartex)
	m["Bell Labs"] = Vartex{
		40.6843, -74.39967,
	}
	fmt.Println(m["Bell Labs"])

	var m2 = map[string]Vartex{
		"Bell Labs": Vartex{
			40.68433, -74.39967,
		},
		"Google": Vartex{
			37.42202, -122.08408,
		},
	}

	fmt.Println(m2)

	var m3 = map[string]Vartex{
		"Bell Labs": {40.68433, -74.39967},
	}
	fmt.Println(m3)

	var m4 = make(map[string]int)

	m4["Question"] = 18

	m4["Answer"] = 42
	fmt.Println("The value:", m4["Answer"])

	m4["Answer"] = 48
	fmt.Println("The value:", m4["Answer"])

	delete(m4, "Answer")
	fmt.Println("The value:", m4["Answer"])

	v, ok := m4["Answer"]
	fmt.Println("The value:", v, "Present?", ok)

	v2, ok2 := m4["Question"]
	fmt.Println("The value:", v2, "Present?", ok2)

	fmt.Println("========闭包========")
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(pos(i), neg(-2*i))
	}

	fmt.Println("========fibonacci========")
	fmt.Println(fibonacci(1))
	fmt.Println(fibonacci(2))
	fmt.Println(fibonacci(3))
	fmt.Println(fibonacci(4))
	fmt.Println(fibonacci(5))
	fmt.Println(fibonacci(6))
	fmt.Println(fibonacci(7))
}

func printSlice(s string, x []int)  {
	fmt.Printf("%s len=%d cap=%d %v\n", s, len(x), cap(x), x)
}

type Vartex struct {
	Lat, Long float64
}

func adder() func(int) int  {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func fibonacci(n int) int  {
	if n < 2 {
		return n
	}
	return fibonacci(n - 2) + fibonacci(n - 1)
}


