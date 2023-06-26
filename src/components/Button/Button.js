import "./Button.scss";

function Button({ onClick = () => {}, children, className = "" }) {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export function OutlineButton({
    children,
    className = "",
    onClick = () => {},
}) {
    return (
        <Button className={`btn--outline ${className}`} onClick={onClick}>
            {children}
        </Button>
    );
}

export default Button;
