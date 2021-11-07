import { AlertGenerator } from "./alert-generator"
import { AlertIndicator } from "./alert-indicator"

export const Header = () => {
    return (
        <header className="nav-header">
            <h1>居室内機器監視システム</h1>
            <AlertIndicator></AlertIndicator>
            <AlertGenerator></AlertGenerator>
        </header>
    )
}