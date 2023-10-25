import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const DATA = [
    {
        id: "23094283-234928309-320498230-sadfj230",
        name: "Mathmozo",
        items: [
            { id: "32049283-asdfa09324-sadkfj-309232sdsaf", name: "3% Milk" },
            { id: "32049283-asdfa09324-sadkfj-309232asdkf", name: "Butter" },
        ],
        tint: 1,
    },
    {
        id: "23094283-234928309-320498230-sadfj220",
        name: "Muktodhara",
        items: [
            { id: "32049283-asdfa09324-sadkfj-309232sds323", name: "Oil" },
            { id: "32049283-asdfa09324-sadkfj-309232asdsaf", name: "Candy" },
        ],
        tint: 2,
    },
    {
        id: "23094283-234928309-34545457-sadfj220",
        name: "Tech Learnopedia",
        items: [
            { id: "32049283-yjg4534-sadkfj-309232sds323", name: "Button bon" },
            { id: "32049283-456435-sadkfj-309232asdsaf", name: "Gillete" },
        ],
        tint: 2,
    },
];

const DragDrop = () => {
    const [stores, setStores] = useState(DATA);
    const handleDragDrop = (results) => {
        const { source, destination, type } = results;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if(type === 'group') {
            const reorderedStores = [...stores];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            const [removedStore] = reorderedStores.splice(sourceIndex, 1);
            reorderedStores.splice(destinationIndex, 0, removedStore);

            return setStores(reorderedStores);
        }
    }


    return (
        <div className="layout__wrapper">
            <div className="cardx">
                <DragDropContext onDragEnd={handleDragDrop}>
                    <div className="header">
                        <h1>Shopping List</h1>
                    </div>
                    <Droppable droppableId="ROOT" type="group">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <ul className="list-group">
                                    {stores.map((store, idx) => (
                                        <Draggable key={store.id} draggableId={store.id} index={idx}>
                                            {(provided, snapshot) => (
                                                <li className="list-group-item"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {store.name}
                                                    <ul>
                                                        {
                                                            store.items.map((item, index) => (
                                                                <li key={item.id}>{item.name}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                    {provided.placeholder}
                                                </li>
                                            )}
                                        </Draggable>

                                    ))}
                                </ul>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default DragDrop;