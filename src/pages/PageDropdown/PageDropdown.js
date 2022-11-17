import { useRef } from "react";
import { Dropdown } from "../../components/Dropdown";

export function PageDropdown() {
    return (
        <div
            className="dropdown-page page" >
            <div className="flex justify-space-between" >
                <Dropdown
                >
                    <button className="menu-item" >I am first</button>
                </Dropdown>
                <Dropdown
                    icon='add'
                >
                    <button className="menu-item" >Can choose icon</button>
                </Dropdown>
            </div>
            <div className="flex justify-space-between bottom-menus" >
                <Dropdown
                    text="Dropdown"
                >
                    <button className="menu-item" >can add Text</button>
                    <button className="menu-item" >can add Text</button>
                    <button className="menu-item" >can add Text</button>
                </Dropdown>
                <Dropdown
                >
                    <button className="menu-item" >Open responsive</button>
                    <button className="menu-item" >Open responsive</button>
                    <button className="menu-item" >Open responsive</button>
                </Dropdown>
            </div>
        </div>
    )
}