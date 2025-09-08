const JapaneseBorder = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <div
      className="absolute inset-0 border-4 border-shiso-600 rounded-lg"
      style={{ borderStyle: "double" }}
    />
    <div className="absolute -top-2 -left-2 w-4 h-4 bg-shiso-600 rounded-full" />
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-shiso-600 rounded-full" />
    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-shiso-600 rounded-full" />
    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-shiso-600 rounded-full" />
    <div className="relative p-6 bg-shiso-50/90 backdrop-blur-sm rounded-lg border-shiso-600/25 border">
      {children}
    </div>
  </div>
);

export default JapaneseBorder;
