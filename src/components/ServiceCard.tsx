
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useIntersectionObserver, useHoverEffect } from "@/hooks/useAnimation";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  price: string;
  features: string[];
}

const ServiceCard = ({
  title,
  description,
  icon,
  image,
  price,
  features,
}: ServiceCardProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const { isHovered, hoverProps } = useHoverEffect();
  
  return (
    <div 
      ref={elementRef}
      className={`group rounded-xl overflow-hidden transition-all duration-500 ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      {...hoverProps}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-glass">
          {icon}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="p-6 bg-background border border-t-0 border-border rounded-b-xl">
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-2">כולל:</div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">החל מ-</div>
            <div className="text-2xl font-bold">{price}</div>
          </div>
          
          <Button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary-effect"
          >
            הזמן עכשיו
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
