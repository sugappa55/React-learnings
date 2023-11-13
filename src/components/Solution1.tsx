import React, { useMemo, useState } from "react";

const elements = Array.from({ length: 10 }, (_, i) => ({
  id: `id - ${i}`,
  label: `Sample item - ${i + 1}`,
}));

interface IElement {
  id: string;
  label: string;
}

interface CheckedElements extends IElement {
  checked: boolean;
}

function Soltion1() {
  const [rightElements, setRightElements] = useState<IElement[]>([]);
  const [leftElements, setLeftElements] = useState<IElement[]>(elements);
  const [rightChecked, setRightChecked] = useState<CheckedElements[]>([]);
  const [leftChecked, setLeftChecked] = useState<CheckedElements[]>([]);

  const handleLeftChecked = (e, elem) => {
    const copyLeftChecked = structuredClone(leftChecked);
    const elemIndex = copyLeftChecked.findIndex((item) => item.id === elem.id);
    if (elemIndex === -1) {
      setLeftChecked([
        ...copyLeftChecked,
        { ...elem, checked: e.target.checked },
      ]);
      return;
    }
    copyLeftChecked[elemIndex] = {
      ...copyLeftChecked[elemIndex],
      checked: e.target.checked,
    };
    setLeftChecked([...copyLeftChecked]);
  };

  const handleMoveToRight = () => {
    const elems = leftChecked.map(({ id, label }) => ({ id, label }));
    const checkedIds = leftChecked.map(({ id }) => id);
    const notCheckedItems = leftElements.filter(
      (elem) => !checkedIds.includes(elem.id)
    );
    setRightElements((prev) => [...prev, ...elems]);
    setLeftChecked([]);
    setLeftElements([...notCheckedItems]);
  };

  const handleRightChecked = (e, elem) => {
    const copyLeftChecked = structuredClone(rightChecked);
    const elemIndex = copyLeftChecked.findIndex((item) => item.id === elem.id);
    if (elemIndex === -1) {
      setRightChecked([
        ...copyLeftChecked,
        { ...elem, checked: e.target.checked },
      ]);
      return;
    }
    copyLeftChecked[elemIndex] = {
      ...copyLeftChecked[elemIndex],
      checked: e.target.checked,
    };
    setRightChecked([...copyLeftChecked]);
  };

  const handleMoveToLeft = () => {
    const elems = rightChecked.map(({ id, label }) => ({ id, label }));
    const checkedIds = rightChecked.map(({ id }) => id);
    const notCheckedItems = rightElements.filter(
      (elem) => !checkedIds.includes(elem.id)
    );
    setLeftElements((prev) => [...prev, ...elems]);
    setRightChecked([]);
    setRightElements([...notCheckedItems]);
  };

  const hasLeftChecked = useMemo(() => !!leftChecked.length, [leftChecked]);
  const hasRightChecked = useMemo(() => !!rightChecked.length, [rightChecked]);

  return (
    <>
      <div className="box">
        {leftElements.map((elem) => (
          <div key={elem.id} className="card">
            <input
              type="checkbox"
              onChange={(e) => handleLeftChecked(e, elem)}
            />
            <label>{elem.label}</label>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleMoveToRight} disabled={!hasLeftChecked}>
          Move to {"-->"}{" "}
        </button>
        <button onClick={handleMoveToLeft} disabled={!hasRightChecked}>
          Move to {"<--"}
        </button>
      </div>
      <div className="box">
        {rightElements.map((elem) => (
          <div key={elem.id} className="card">
            <input
              type="checkbox"
              onChange={(e) => handleRightChecked(e, elem)}
            />
            <label>{elem.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default Soltion1;
