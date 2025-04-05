type StringProps = {
  children: React.ReactNode;
};

export function String(props: StringProps) {
  return <div>{props.children}</div>;
}
