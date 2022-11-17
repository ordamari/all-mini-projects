import { Icons } from "../Icons";

export function Header({
    toggleIsSidebarOpen
}) {
    return (
        <header className="header">
            <button
                className="menu-btn"
                onClick={() => toggleIsSidebarOpen()}
            >
                <Icons icon="menu" />
            </button>
        </header>
    )
}