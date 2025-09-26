interface SpinnerProps {
  height?: string;
  width?: string;
  color?: "white" | "blue" | "primary";
}

const Spinner = ({
  height = "h-6",
  width = "w-6",
  color = "primary",
}: SpinnerProps) => (
  <div
    className={`animate-spin rounded-full ${height} ${width} border-b-2 border-${color}`}
  />
);

export default Spinner;
