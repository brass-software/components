package main

import "os"

func main() {
	name := os.Args[1]
	err := createComponent(name)
	if err != nil {
		panic(err)
	}
}
