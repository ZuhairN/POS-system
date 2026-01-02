export default function ActionBtn({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button className={`h-[5rem] rounded-full  text-lg font-semibold ${className}`} {...props}>
      {children}
    </button>
  );
}
