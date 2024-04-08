const Title = ({ children, className }) => {
  return (
    <div className="relative border-s-8 border-orange-400 ps-3">
      <h2 className={"text-6xl font-bold " + className}>{children}</h2>
      <p className={"absolute bottom-0 text-9xl -z-10 opacity-5 " + className}>
        {children}
      </p>
    </div>
  );
};

export default Title;
