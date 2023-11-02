function Button({ className, children, type, onClick }) {
  const base = `transition duration-300 p-2`;
  const styles = {
    sm: `bg-gray-300 hover:bg-gray-400 transition duration-300 gap-1 flex rounded-full justify-center`,
    md: `bg-blue-300 rounded-lg hover:bg-blue-500`,
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[type]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
