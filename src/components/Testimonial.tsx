
import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useAnimation";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
  index: number;
}

const Testimonial = ({
  quote,
  author,
  role,
  image,
  rating,
  index,
}: TestimonialProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-50px",
  });
  
  const getDelay = () => {
    return (index % 3) * 0.2;
  };
  
  return (
    <div
      ref={elementRef}
      className={`glass-card p-6 transition-all duration-500 hover:shadow-glass-lg h-full flex flex-col justify-between ${
        isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${getDelay()}s`,
      }}
    >
      <div>
        <div className="mb-4 flex justify-between items-start">
          <div className="flex -ml-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <Quote className="h-6 w-6 text-primary opacity-50" />
        </div>
        
        <blockquote className="text-foreground mb-4 leading-relaxed">
          "{quote}"
        </blockquote>
      </div>
      
      <div className="flex items-center mt-4">
        <div className="flex-shrink-0 mr-3">
          <img
            src={image}
            alt={author}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-foreground">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
