import { useState } from "react";

export default function Home() {
  const { components, addComponent } = useComponents()
  return <ComponentListPage components={components} addComponent={addComponent} />
}
