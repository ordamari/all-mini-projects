import styles from '../../../assets/style/modules/button.module.scss'

export function OutletButtons() {

    return (
        <div className="outlet-buttons outlet flex column gap-1" >
            <div className="flex gap-1 container-box" >
                <button className="button primary">Primary</button>
                <button className="button secondary">Secondary</button>
                <button className="button warning">Warning</button>
                <button className="button success">Success</button>
                <button className="button info">Info</button>
                <button className="button error">Error</button>
            </div>
            <div className="flex gap-1 container-box align-center" >
                <button className={styles.button1}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    HOVER ME
                </button>

                <button className={styles.button2}>
                    HOVER ME
                </button>

                <button className={styles.button3}>Hover Me</button>

                <span className={styles['button-container1']} ><a text='HOVER ME' /></span>

            </div>
        </div>




    )
}