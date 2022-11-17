import { useState } from "react";
import { Checkbox } from "../../../components/Checkbox";
import { Input } from "../../../components/Input";
import { RadioButton } from "../../../components/RadioButton";
import { SearchInput } from "../../../components/SearchInput";
import { Select } from "../../../components/Select";
import { Switch } from "../../../components/Switch";
import { useToggle } from "../../../hooks/useToggle";

export function OutletInputs() {

    const [text, setText] = useState('');
    const [radioButtonValue, setRadioButtonValue] = useState('first');
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState(0);
    const [isCheck, toggleIsCheck] = useToggle();
    const [selectValue, setSelectValue] = useState('');
    const [multiSelectValue, setMultiSelectValue] = useState([]);

    const options = [
        { id: 1, label: 'first', value: 1 },
        { id: 2, label: 'second', value: 2 },
        { id: 3, label: 'third', value: 3 },
        { id: 4, label: 'fourth', value: 4 },
        { id: 5, label: 'fiveth', value: 5 },
    ]

    return (
        <div className="outlet-inputs outlet flex column gap-1" >

            <div className="container-box w100 flex column gap-1" >
                <SearchInput
                    onChange={setSearch}
                />
            </div>
            <div className="flex gap-1" >
                <div className="container-box full flex column gap-1" >

                    <Input
                        value={text}
                        onChange={setText}
                        placeholder='Text'
                    />
                    <Input
                        value={text}
                        onChange={setText}
                        placeholder='Text'
                        style={2}
                    />
                </div>
                <div className="container-box full flex column gap-1" >
                    <Input
                        value={number}
                        onChange={setNumber}
                        placeholder='Number'
                        type="number"
                    />
                    <Input
                        value={number}
                        onChange={setNumber}
                        placeholder='Number'
                        style={2}
                        type="number"
                    />
                </div>
            </div>
            <div className="flex gap-1">
                <div className="container-box w100 flex column gap-1" >
                    <div className="flex justify-space-between" >
                        <div className=" flex column gap-1" >

                            <Checkbox
                                isCheck={isCheck}
                                toggleIsCheck={toggleIsCheck}
                            >
                                checkbox
                            </Checkbox>
                            <Checkbox
                                isCheck={isCheck}
                                toggleIsCheck={toggleIsCheck}
                                style={2}
                            >
                                checkbox
                            </Checkbox>

                            <Checkbox
                                isCheck={isCheck}
                                isDisabled={true}
                                toggleIsCheck={toggleIsCheck}
                            >
                                checkbox
                            </Checkbox>
                        </div>
                        <div className=" flex column gap-1" >
                            <Switch
                                isCheck={isCheck}
                                toggleIsCheck={toggleIsCheck}
                            >
                                toggle
                            </Switch>
                            <Switch
                                isCheck={isCheck}
                                isDisabled={true}
                                toggleIsCheck={toggleIsCheck}
                            >
                                toggle
                            </Switch>
                        </div>
                    </div>
                </div>
                <div className="container-box w100 flex column gap-1" >
                    <Select
                        value={selectValue}
                        onChange={setSelectValue}
                        placeholder='Select'
                        options={options}
                    />

                    <Select
                        value={multiSelectValue}
                        onChange={setMultiSelectValue}
                        placeholder='Multi select'
                        isMultiSelect={true}
                        options={options}
                    />
                </div>
            </div>
            <div className="container-box w100 flex column gap-1" >
                {
                    options.map((option, idx) => (
                        <RadioButton
                            key={idx}
                            label={option.label}
                            isChecked={option.label === radioButtonValue}
                            onChange={() => { setRadioButtonValue(option.label) }}
                        />

                    ))
                }
            </div>
        </div>

    )
}