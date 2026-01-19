import jdksLogo from "@/assets/jdks_logo_wordmark.png";

const footerLinks = [
  "Interior Visualization",
  "Exterior Visualization",
  "3D Modeling & Post-Production",
  "VR / AR Experiences",
  "3D Animation & Walkthroughs",
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src={jdksLogo} alt="JDKS Logo" className="h-32 w-auto" />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jash Kadakiia Design Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
