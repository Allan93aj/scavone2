type Props = JSX.IntrinsicElements['textarea'];
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Props {
  label?: string;
  error?: string;
}

export type { TextAreaProps };
