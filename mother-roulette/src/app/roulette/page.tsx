'use client'

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { BiTrash, BiGridVertical, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Roulette from "./Roulette";


export interface InputList {
    id: string;
    text: string;
}

const FormularioTexto = () => {
    const [inputList, setInputList] = useState<InputList[]>([
        {
            id: uuidv4(),
            text: "30% de descuento"
        },
        {
            id: uuidv4(),
            text: "50% de descuento"
        },
        {
            id: uuidv4(),
            text: "Un premio"
        },
        {
            id: uuidv4(),
            text: "10 USD"
        },
        {
            id: uuidv4(),
            text: "Un abrazo"
        },
    ]);

    // handle input change
    interface InputList {
        id: string;
        text: string;
        [key: string]: string; // Add index signature
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { text: "", id: uuidv4() }]);
    };

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(inputList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setInputList(items);
    }

    return (
        <div className="main-form">
            <div className="text-title">
                <h2>Ruleta Rusa</h2>
            </div>
            {/*  */}
            <Roulette data={inputList} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="items">
                    {
                        (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                            <ul
                                className="items"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ listStyle: "none" }}
                            >
                                {inputList.map((x, index) => {
                                    return (
                                        <Draggable key={x.id} draggableId={x.id} index={index}>
                                            {
                                                (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    // @ts-ignore  
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="list-item"
                                                    >
                                                        <div className="item">
                                                            <BiGridVertical />
                                                            <input
                                                                name="text"
                                                                placeholder="Enter option..."
                                                                value={x.text}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                                className="input"
                                                            />
                                                            <div className="btn-box">
                                                                {inputList.length !== 1 && (
                                                                    <button
                                                                        className="button"
                                                                        onClick={() => handleRemoveClick(index)}
                                                                    >
                                                                        <BiTrash />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                </Droppable>
            </DragDropContext>
            <button
                onClick={handleAddClick}
                style={{ marginLeft: "2.1rem" }}
                className="button"
            >
                <BiPlus />
            </button>
        </div>
    );
};

export default FormularioTexto;
