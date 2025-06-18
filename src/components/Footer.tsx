export const Footer = () => {
  return (
    <footer className="text-center py-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-inner">
      <p className="text-sm opacity-80">
        &copy; {new Date().getFullYear()} Currency Converter. All rights
        reserved.
      </p>
    </footer>
  );
};
