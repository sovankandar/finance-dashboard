const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Nexus Finance. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;