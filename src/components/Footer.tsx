import jkdsLogo from "@/assets/jkds_logo.png";
import { Facebook, Instagram, Phone } from "lucide-react";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/jashkadakiiadesignstudio?rdid=hJeyPVeIU4zpc5x1", icon: Facebook },
  { name: "Instagram", url: "https://www.instagram.com/jashkadakiiadesignstudio", icon: Instagram },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src={jkdsLogo} alt="jkds Logo" className="h-24 md:h-32 w-auto" />
          </a>

          {/* Contact & Social Links */}
          <div className="flex flex-col items-center md:items-end gap-6">
            
            {/* Phone */}
            <a 
              href="tel:+919920036610" 
              className="flex items-center gap-3 text-sm md:text-base text-foreground hover:text-muted-foreground transition-colors tracking-widest font-medium group"
            >
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="mt-0.5">+91 99200 36610</span>
            </a>

            {/* Social Media Links */}
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </nav>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center flex flex-col items-center">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
            © {new Date().getFullYear()} Jash Kadakiia Design Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
