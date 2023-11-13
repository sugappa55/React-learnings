import React, { useId, useMemo, useState } from "react";

const elements = Array.from({ length: 10 }, (_, i) => ({
  id: `id - ${i}`,
  label: `Sample item - ${i + 1}`,
  checked: false,
}));

interface IElement {
  id: string;
  label: string;
  checked: boolean;
}

const Card = ({ elem, handleChange }) => {
  const id = useId();
  return (
    <div className="card">
      <input type="checkbox" onChange={(e) => handleChange(e, elem)} id={id} />
      <label htmlFor={id}>{elem.label}</label>
    </div>
  );
};

function Soltion2() {
  const [rightElements, setRightElements] = useState<IElement[]>([]);
  const [leftElements, setLeftElements] = useState<IElement[]>(elements);

  const handleLeftChecked = (e, elem) => {
    const copyLeftChecked = structuredClone(leftElements);
    const elemIndex = copyLeftChecked.findIndex((item) => item.id === elem.id);
    if (elemIndex === -1) {
      setLeftElements([
        ...copyLeftChecked,
        { ...elem, checked: e.target.checked },
      ]);
      return;
    }
    copyLeftChecked[elemIndex] = {
      ...copyLeftChecked[elemIndex],
      checked: e.target.checked,
    };
    setLeftElements([...copyLeftChecked]);
  };

  const handleMoveToRight = () => {
    const { checked, unChecked } = leftElements.reduce(
      (acc, curr) => {
        const copyContainer = structuredClone(acc);
        if (curr.checked) {
          copyContainer["checked"].push({ ...curr, checked: false });
        } else {
          copyContainer["unChecked"].push({ ...curr, checked: false });
        }
        return copyContainer;
      },
      { checked: [], unChecked: [] }
    );

    setRightElements((prev) => [...prev, ...checked]);
    setLeftElements((prev) => [...unChecked]);
  };

  const handleRightChecked = (e, elem) => {
    const copyLeftChecked = structuredClone(rightElements);
    const elemIndex = copyLeftChecked.findIndex((item) => item.id === elem.id);
    if (elemIndex === -1) {
      setRightElements([
        ...copyLeftChecked,
        { ...elem, checked: e.target.checked },
      ]);
      return;
    }
    copyLeftChecked[elemIndex] = {
      ...copyLeftChecked[elemIndex],
      checked: e.target.checked,
    };
    setRightElements([...copyLeftChecked]);
  };

  const handleMoveToLeft = () => {
    const { checked, unChecked } = rightElements.reduce(
      (acc, curr) => {
        const copyContainer = structuredClone(acc);
        if (curr.checked) {
          copyContainer["checked"].push({ ...curr, checked: false });
        } else {
          copyContainer["unChecked"].push({ ...curr, checked: false });
        }
        return copyContainer;
      },
      { checked: [], unChecked: [] }
    );

    setLeftElements((prev) => [...prev, ...checked]);
    setRightElements((prev) => [...unChecked]);
  };

  const hasLeftChecked = useMemo(
    () => leftElements.some((elem) => elem.checked),
    [leftElements]
  );
  const hasRightChecked = useMemo(
    () => rightElements.some((elem) => elem.checked),
    [rightElements]
  );

  return (
    <>
      <div className="box">
        {leftElements.map((elem) => (
          <Card key={elem.id} elem={elem} handleChange={handleLeftChecked} />
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
          <Card key={elem.id} elem={elem} handleChange={handleRightChecked} />
        ))}
      </div>
    </>
  );
}

export default Soltion2;
