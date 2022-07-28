import "./index.css";
import React, { FC, ChangeEvent, useState } from "react";

interface Param {
  id: number;
  name: string;
  type: inputType;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface IInput {
  type: string;
  value: ParamValue;
  label: string;
}
interface IButton {
  callback: () => Model;
}

type inputType = "text" | "number" | "radio";

const params: Param[] = [
  { id: 1, name: "Назначение", type: "text" },
  { id: 2, name: "Длина", type: "text" },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const ParamEditor: FC<Props> = ({ params, model }) => {
  function getModel(): Model {
    console.log(model);
    return model;
  }

  return (
    <>
      {params.map((p, i) => (
        <Input
          key={p.id}
          type={p.type}
          value={
            model.paramValues.find((paramValue) => paramValue.paramId === p.id)!
          }
          label={p.name}
        />
      ))}
      <Button callback={getModel}></Button>
    </>
  );
};

const Input: FC<IInput> = ({ type, value, label }) => {
  const [inputValue, setValue] = useState(value);

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    value.value = e.target.value;
    setValue((inputValue) => ({
      ...inputValue,
      value: e.target.value,
    }));
  }

  return (
    <label>
      <span>{label}</span>
      <input type={type} value={inputValue.value} onChange={changeInput} />
    </label>
  );
};

const Button: FC<IButton> = ({ callback }) => {
  return <button onClick={callback}>Получить структуру</button>;
};

function App() {
  return <ParamEditor params={params} model={model}></ParamEditor>;
}

export default App;
