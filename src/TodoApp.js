import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const ITEMS = [
  {
    id: 1,
    title: "lorem ipsom bla 1111",
    complated: true,
  },
  {
    id: 2,
    title: "lorem ipsom bla 2222",
    complated: true,
  },
  {
    id: 3,
    title: "lorem ipsom bla 3333",
    complated: false,
  },
  {
    id: 4,
    title: "lorem ipsom bla 3333",
    complated: false,
  },
];

const TodoApp = () => {
  const [todoes, setTodoes] = useState(ITEMS);
  const [value, setValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setTodoes(JSON.parse(localStorage.getItem("items")));
    }
  }, []);

  function onItemChange(clickedItem) {
    const newValue = todoes.map((item) => {
      if (item.id === clickedItem.id) {
        item.complated = !item.complated;
      }
      return item;
    });
    setTodoes(newValue);
  }
  function onnAddNewItem(e) {
    e.preventDefault();

    const newItems = [
      {
        id: Date.now(),
        title: value,
        complated: false,
      },
      ...todoes,
    ];
    setTodoes(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    setValue("");
  }
  function onItemDelete(itemId) {
    const newItems = todoes.filter((item) => item.id !== itemId);
    setTodoes(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }
  const totalItem = todoes.length;
  const itemsComplated = todoes.filter((item) => item.complated).length;
  const itemsNotComplated = todoes.filter((item) => !item.complated).length;
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <form action="" onSubmit={onnAddNewItem}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
          />
        </form>
      </div>
      <ul>
        {todoes.map((item) => (
          <li
            key={item.id}
            className={classNames({ complated: item.complated })}
          >
            <input
              type="checkbox"
              checked={item.complated}
              onChange={() => onItemChange(item)}
            />
            {item.title}
            <button onClick={() => onItemDelete(item.id)}>delete</button>
          </li>
        ))}
      </ul>
      სულ: {totalItem}, დასრულებული: {itemsComplated}, დაუსრულებელი:
      {itemsNotComplated}
    </div>
  );
};

export default TodoApp;
