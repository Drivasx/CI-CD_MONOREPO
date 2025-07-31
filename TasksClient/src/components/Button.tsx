interface ButtonProps {
    label: string;
    style: React.CSSProperties;
    onClick: () => void;
}
export const Button = ({props}: {props: ButtonProps}) => {
  return (
    <button style={props.style} onClick={props.onClick}>
      {props.label}
    </button>
  )
}
