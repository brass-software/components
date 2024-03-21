import { useState } from "react";
import { List, ListPage } from "../../components";

export default function Home() {
  const { components, addComponent } = useComponents()
  return <ListPage
    elemType={{
      name: "Component",
      pluralName: "Components",
    }}
    endpoint="/components"
    items={[]}
    addItem={{
      Name: "Add Component",
      Endpoint: "/",
      Inputs: [
        {
          ID: "name",
          Name: "Name",
          Type: {
            ID: "string",
            Name: "string",
            PluralName: "strings",
            IsScalar: true,
            Scalar: "string",
          }
        }
      ],
      Outputs: [],
    }}
  />
}
