import React, { useState } from "react";
import Konva from "konva";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Circle } from "react-konva";

function generateItems() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: "node-" + i,
      color: Konva.Util.getRandomColor(),
    });
    // console.log(items);
  }
  return items;
}
const INITIAL_STATE = generateItems();
const App = () => {
  const [circles, setCircles] = useState(INITIAL_STATE);
  const handleDragStart = (e) => {
    const id = e.target.name();
    const items = circles.slice();
    const item = items.find((i) => i.id === id);
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);
    setCircles(items);
  };
  const handleDragEnd = (e) => {
    const id = e.target.name();
    const items = circles.slice();
    const item = circles.find((i) => i.id === id);
    const index = circles.indexOf(item);
    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };
    setCircles(items);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {circles.map((item) => (
          <Circle
            key={item.id}
            name={item.id}
            draggable
            x={item.x}
            y={item.y}
            fill={item.color}
            radius={50}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
