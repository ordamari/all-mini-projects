import { OutletLabels } from "../../components/OutletLabels"

export function ControlPages() {
    const labels = [
        {
            icon: 'input',
            to: 'input',
            text: 'Inputs'
        },
        {
            icon: 'picker',
            to: 'picker',
            text: 'Pickers'
        },
        {
            icon: 'button',
            to: 'button',
            text: 'Buttons'
        },
    ]

    return (
        <div className="controls-pages page" >
            <OutletLabels
                labels={labels}
            />
        </div>
    )
}