package brass

import (
	"bytes"
	"text/template"
)

func CreateComponent(name string) error {
	t := ``
	tmpl, err := template.New("component").Parse(t)
	if err != nil {
		panic(err)
	}
	buf := bytes.NewBuffer(nil)
	return tmpl.Execute(buf, nil)
}
