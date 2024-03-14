import { useState } from "react";
import { Action, Component } from "../types";

export function ListPage(props: {
    elemType: {
        name: string;
        pluralName: string;
    };
    items: {
        name: string;
        url: string;
    }[];
    addItem: Action;
}) {
    return <div>
        <Heading title={props.elemType.pluralName} actions={[{
            Name: "Add "+props.elemType.name,
            Endpoint: "POST /api/components",
            Inputs: [],
            Outputs: [],
        }]} />
        <List items={props.items} />
    </div>
}

export function List(props: {
    items: {
        name: string;
        url: string;
    }[];
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
