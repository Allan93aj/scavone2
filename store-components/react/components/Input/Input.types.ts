type Props = JSX.IntrinsicElements['input'];
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Props {
  label?: string;
  error?: string;
  mask?: string | Array<string | RegExp>;
}

export type { InputProps };
