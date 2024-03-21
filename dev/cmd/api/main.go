package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/mikerybka/util"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := util.ParsePath(r.URL.Path)
		if len(path) == 0 {
			if r.Method == "GET" {
				listComponents(w)
				return
			}
			if r.Method == "POST" {
				addComponent(w, r)
				return
			}
		} else if len(path) == 1 {
			if r.Method == "GET" {
				getComponent(w, r)
				return
			}
			if r.Method == "PUT" {
				putComponent(w, r)
				return
			}
		}

	})
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}

func listComponents(w http.ResponseWriter) {
	entries, err := os.ReadDir("components")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("<ul>"))
	for _, e := range entries {
		name := strings.TrimSuffix(e.Name(), ".json")
		url := fmt.Sprintf("/%s", name)
		fmt.Fprintf(w, "<li><a href=\"%s\">%s</a></li>", url, name)
	}
	w.Write([]byte("</ul>"))
}

func addComponent(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ID string
	}
	json.NewDecoder(r.Body).Decode(&req)

}
func getComponent(w http.ResponseWriter, r *http.Request) {}
func putComponent(w http.ResponseWriter, r *http.Request) {}
