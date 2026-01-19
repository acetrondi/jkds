import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactBg from "@/assets/contact-bg.jpg";
import jdksLogo from "@/assets/jdks_logo.avif";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section className="w-full bg-black py-48 px-4 md:px-12 lg:px-20 overflow-visible">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Background Card - Now with limited overflow */}
        <div className="relative w-full aspect-[21/9] min-h-[400px] md:min-h-[500px] rounded-[40px] overflow-hidden flex flex-col items-center justify-center px-8 z-10">
          <div className="absolute inset-0 z-0">
            <img
              src={contactBg}
              alt="Luxury interior"
              className="w-full h-full object-cover"
            />
            {/* Darker overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Text Content - Centered in the card */}
          <div className="relative z-10 text-center -translate-y-12 md:-translate-y-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight leading-tight">
              Have <span className="text-[#c5a87f]">a Project</span>
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              in Mind?
            </h2>
          </div>
        </div>

        {/* Floating Form Bar - Positioned outside the overflow-hidden card to prevent cutting */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[95%] max-w-6xl z-30">
          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-100">
            <div className="text-center mb-8">
              <p className="text-gray-500 text-sm md:text-lg font-medium max-w-2xl mx-auto">
                Tell us about your project, and we'll prepare a customized proposal with timelines and pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-50/50 border-gray-100 rounded-full h-14 px-6 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#c5a87f] focus-visible:border-[#c5a87f] transition-all"
                />
              </div>
              <div className="flex-1 w-full">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-50/50 border-gray-100 rounded-full h-14 px-6 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#c5a87f] focus-visible:border-[#c5a87f] transition-all"
                />
              </div>
              <div className="flex-1 w-full">
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-50/50 border-gray-100 rounded-full h-14 px-6 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#c5a87f] focus-visible:border-[#c5a87f] transition-all"
                />
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto px-10 h-14 rounded-full bg-[#c5a87f] hover:bg-[#b39770] text-white font-bold uppercase tracking-[0.1em] text-xs whitespace-nowrap shadow-lg shadow-[#c5a87f]/20 transition-all duration-300"
              >
                Send Request
              </Button>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;
