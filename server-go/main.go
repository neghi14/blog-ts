package main

import (
	"fmt"
	"os"
)

func main() {
	id := os.Getppid()
	fmt.Println(id)
}
