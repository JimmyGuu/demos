package main

import (
	"math"
	"fmt"
)

func main() {
	v := &Vertex2{3, 4}
	fmt.Println(v.Abs())

	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs2())
}

type Vertex2 struct {
	X, Y float64
}

func (v *Vertex2) Abs() float64  {
	return math.Sqrt(v.X * v.X + v.Y * v.Y)
}

type MyFloat float64

func (f MyFloat) Abs2() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}
