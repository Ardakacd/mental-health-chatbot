const Footer = () => {
    return (
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} MindfulChat - Mental Health Support Chatbot
              </p>
            </div>
            
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;