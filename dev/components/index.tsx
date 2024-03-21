import { useState } from "react";
import { Action, Component } from "../types";

type ListItem = {
    id: string;
}
 function useList(endpoint: string) {
    const [items, setItems] = useState<ListItem[]>([]);
    const addItem = async (id: string) => {
        const res = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                id,
            }),
        })
        if (!res.ok) {
            throw new Error(await res.text());
        }
        const d = await res.json();
        setItems(d.items);
    }
    return {
        items,
        addItem,
    }
}

export function ListPage(props: {
    elemType: {
        name: string;
        pluralName: string;
    };
    endpoint: string;
    items: {
        name: string;
        url: string;
    }[];
    addItem:  (id: string) => Promise<void>;
}) {
    const {items, addItem} = useList(props.endpoint);
    return <div>
        <Heading title={props.elemType.pluralName} actions={[{
            Name: "Add "+props.elemType.name,
            Endpoint: "/api"+props.endpoint,
            Inputs: [
                {
                    "ID": "id",
                    "Name": "ID",
                    "Type": {
                        ID: "string",
                        Name: "string",
                        PluralName: "strings",
                        IsScalar: true,
                        Scalar: "string",
                    },
                }
            ],
            Outputs: [],
        }]} />
        <List items={items} />
    </div>
}

export function List(props: {
    items: ListItem[];
}) {
    return <ul>
        {
            props.items.map(item => {
                return <li>
                    <a href={item.url}>
                        {item.name}
                    </a>
                </li>
            })
        }
    </ul>
}

export function ActionButton(props: {
    action: Action;
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    }
    return <button onClick={showModal}>{props.action.Name}</button>
}

function Heading(props: {
    title: string;
    actions: Action[];
}) {
    return <div></div>;
}


function useComponents() {
    const [components, setComponents] = useState<Component[]>([]);
    return {
        components,
        addComponent: () => { }
    };
}
